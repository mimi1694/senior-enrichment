const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    gpa: {
        type: Sequelize.DECIMAL,
        validate: {
            min: 0.0,
            max: 4.0
        }
    },
    fullName: {
        type: Sequelize.VIRTUAL,
        get (){
            return this.getDataValue('firstName')+' '+this.getDataValue('lastName')
        }
    }
})