//Since I do not use a db saving credentials here
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

const userCrendentials = [
    {
        email: "user@test.com",
        password:  bcrypt.hashSync("test1234", salt)
    }
]

module.exports = {userCrendentials, salt}