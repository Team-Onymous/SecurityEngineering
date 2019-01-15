module.exports = function (sequelize, Sequelize) {

    return sequelize.define('session', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        expires: {
            type: Sequelize.DATE
        },
        data: {
            type: Sequelize.STRING(50000)
        }
    });

}