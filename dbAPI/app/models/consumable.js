module.exports = function (sequelize, Sequelize) {

    return sequelize.define('consumable', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        type: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        alcoholic: {
            type: Sequelize.BOOLEAN
        },
        cost: {
            type: Sequelize.INTEGER,
        }
    });
};