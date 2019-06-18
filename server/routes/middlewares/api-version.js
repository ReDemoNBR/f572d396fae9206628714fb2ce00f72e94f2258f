// this middleware appends a response header to identify the version of the API service

const {API_HEADER_NAME, API_HEADER_VALUE} = require("../../util/env");

module.exports = (req, res, next) => {
    res.set(API_HEADER_NAME, API_HEADER_VALUE);
    return next();
};