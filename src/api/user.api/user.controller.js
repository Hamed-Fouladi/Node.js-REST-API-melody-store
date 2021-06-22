const { users } = require('../../../database/models');

module.exports = {
    getProfileData: (req, res) => {
        try {
            users.findOne({
                where: {
                    id: req.user.userId,
                },
                attributes: ['id', 'name', 'email'],
            }).then((user) => {
                // console.log(user);
                res.status(200).json({ userProfile: user });
            }).catch((error) => {
                res.status(500).send({ message: error.message });
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
};
