const {underscore} = require("inflection");

const db = require("./db");

// Models
const Auth = require("./models/auth");
const User = require("./models/user");
const Item = require("./models/item");
const Sale = require("./models/sale");

// foreign key creation helper function
const fk = name => ({foreignKey: {name, field: underscore(name), allowNull: false}});

// User -> Price relation
User.hasMany(Sale, fk("userId"));
Sale.belongsTo(User, fk("userId"));

// Item -> Sale relation
Sale.belongsTo(Item, fk("itemId"));
Item.hasMany(Sale, fk("itemId"));

// User -> Auth relation
Auth.belongsTo(User, fk("userId"));
User.hasMany(Auth, fk("userId"));

module.exports = db;