const {DataTypes} = require("sequelize");
const {dasherize} = require("inflection");
const {abs} = Math;

const update = instance => ({
    ...instance,
    price: abs(instance.price),
    quantity: abs(instance.quantity)
});

const Sale = require("../db").define("sale", {
    userId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: "user_id"
    },
    itemId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: "item_id"
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    schema: "public",
    tableName: "sale"
});

Sale.addHook("beforeBulkCreate", instances=>instances.forEach(update));
Sale.addHook("beforeBulkCreate", options=>options.individualHooks = true);
Sale.addHook("beforeCreate", update);
Sale.addHook("beforeUpdate", update);

module.exports = Sale;