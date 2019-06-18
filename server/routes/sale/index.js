const router = require("express").Router();

router.use(require("../middlewares/is-auth"));
router.post("/", require("./create"));
router.get("/:itemId", require("./read"));
router.get("/", require("./list"));
router.put("/:productId", require("./update"));
router.delete("/:itemId", require("./delete"));

module.exports = router;