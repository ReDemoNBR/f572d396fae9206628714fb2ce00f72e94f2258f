const {DataTypes} = require("sequelize");

module.exports = require("../db").define("user", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(128),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        field: "first_name"
    },
    lastName: {
        type: DataTypes.STRING,
        field: "last_name"
    }
}, {
    indexes: [{fields: ["login", "password"]}],
    schema: "public",
    tableName: "user"
});