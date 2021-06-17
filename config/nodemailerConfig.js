const nodemailer = require('nodemailer');
const config = require('./jwtConfig');

const { user } = config;
const { pass } = config;

// eslint-disable-next-line no-unused-vars
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user,
        pass,
    },
});

module.exports.sendConfirmationEmail = (userEmail, verificationCode) => {
    transport.sendMail({
        from: user,
        to: userEmail,
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello dear guest</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following button or copy verification code and paste to the application</p>
        <p>${verificationCode}</p>
        <p>This password reset link will expire in 24h.</p>
        <button><a style="text-decoration: none" href=http://localhost:5001/api/auth/confirm/${verificationCode}> Click here</a></button>
        </div>`,
    }, (error) => {
        console.log('sendConfirmationEmail error:', error.message); // JSON string
    });
};
