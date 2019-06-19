const router = require("express").Router();

router.use(require("../middlewares/is-auth"));

// CRUD of items on sale by me (kinda SOAP-ish instead of REST)...
// User is identified by the access token (middleware that does this is used right above)

router.post("/", require("./create"));
router.get("/:itemId", require("./read"));
router.get("/", require("../middlewares/query-input"), require("./list"));
router.put("/:itemId", require("./update"));
router.delete("/:itemId", require("./delete"));

module.exports = router;