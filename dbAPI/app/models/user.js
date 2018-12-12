module.exports = function (sequelize, Sequelize) {

    return sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        wallet_address: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        pass_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        date_of_birth: {
            type: Sequelize.DATE
        },
        street: {
            type: Sequelize.STRING
        },
        house_number: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.INTEGER
        }
    });

};