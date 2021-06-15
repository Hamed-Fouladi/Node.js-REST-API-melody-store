const nodemailer = require('nodemailer');
const config = require('./jwtConfig');

const { email } = config;
const { password } = config;

// eslint-disable-next-line no-unused-vars
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        email,
        password,
    },
});

module.exports.sendConfirmationEmail = (userEmail, verification_code) => {
    transport.sendMail({
        from: email,
        to: userEmail,
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5001/api/auth/confirm/${verification_code}> Click here</a>
        </div>`,
    }, (error) => {
        console.log('sendConfirmationEmail error:', error.message); // JSON string
    });
};
