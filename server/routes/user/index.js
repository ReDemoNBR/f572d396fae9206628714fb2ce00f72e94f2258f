const router = require("express").Router();

router.post("/", require("./create"));
router.get("/:id", require("./read"));
router.get("/", require("./list"));
router.post("/login", require("./login"));

router.use(require("../middlewares/is-auth"));
router.put("/:id", require("./update"));
router.delete("/logout", require("./logout"));
router.delete("/:id", require("./delete"));

module.exports = router;