module.exports = function (sequelize, Sequelize) {

    return sequelize.define('transaction', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        tx_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        token_amount: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        incoming: {
            type: Sequelize.BOOLEAN
        },
        order: {
            type: Sequelize.JSON
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users', // Can be both a string representing the table name, or a reference to the model
                key: "id"
            }
        }
    });
};