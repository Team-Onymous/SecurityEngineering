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
                type: Sequelize.STRING,
                allownull: false,
                validate: {
                    is: ["^[A-Za-z ]+$", 'i'],     // will only allow letters
                }
            },
            lastname: {
                type: Sequelize.STRING,
                validate: {
                    is: ["^[A-Za-z ]+$", 'i'],     // will only allow letters
                }
            },
            email: {
                type: Sequelize.STRING,
                allownull: false,
                unique: {
                    args: true,
                    msg: 'Email address already in use!'
                },
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    is: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"] // no special characters, minimal 8 characters
                }
            },
            last_login: {
                type: Sequelize.DATE
            },
            date_of_birth: {
                type: Sequelize.DATE,
                validate: {
                    isDate: true
                }
            },
            street: {
                type: Sequelize.STRING,
                validate: {
                    is: ["^[A-Za-z ]+$", 'i'],     // will only allow letters
                }
            },
            house_number: {
                type: Sequelize.STRING
            },
            postal_code: {
                type: Sequelize.STRING,
                validate: {
                    is: ["^[0-9]{4} ?([A-Za-z]{2})$", 'i'],     // will only allow numbers in the first 4, second 2 will only allow letters
                }
            },
            city: {
                type: Sequelize.STRING,
                validate:
                    {
                        is: ["^[A-Za-z ]+$", 'i'],     // will only allow letters
                    }
            },
            role: {
                type: Sequelize.INTEGER
            }
        }
    );
};