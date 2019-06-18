const router = require("express").Router();

router.post("/", require("./create"));
router.get("/:id", require("./read"));
// router.get("/", require("./list"));
// router.put("/:id", require("./update"));
// router.delete("/:id", require("./delete"));

module.exports = router;