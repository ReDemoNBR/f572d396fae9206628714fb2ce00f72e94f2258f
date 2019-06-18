const {DataTypes} = require("sequelize");

module.exports = require("../db").define("auth", {
    token: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    indexes: [{fields: ["user_id"]}],
    schema: "public",
    tableName: "auth"
});