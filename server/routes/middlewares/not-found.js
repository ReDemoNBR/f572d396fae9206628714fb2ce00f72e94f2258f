// This middleware reponds when no other route is matched
// So it returns a 404 status with a message

module.exports = (req, res, next) => res.status(404).send({message: `Endpoint not found ${req.originalUrl}`});