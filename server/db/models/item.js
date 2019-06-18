const {DataTypes} = require("sequelize");
const {dasherize} = require("inflection");

const update = instance => instance.alias = instance.alias || dasherize(instance.name.toLowerCase());

const Item = require("../db").define("item", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT
}, {
    schema: "public",
    tableName: "product"
});


Item.addHook("beforeBulkCreate", instances=>instances.forEach(update));
Item.addHook("beforeBulkCreate", options=>options.individualHooks = true);
Item.addHook("beforeCreate", update);
Item.addHook("beforeUpdate", update);

module.exports = Item;