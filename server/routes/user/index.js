const router = require("express").Router();

const isAuth = require("../middlewares/is-auth");

router.get("/whoami", isAuth, require("./whoami")); // identify the user by its access token

router.post("/", require("./create"));
router.get("/:id", require("./read"));
router.get("/", require("../middlewares/query-input"), require("./list"));
router.post("/login", require("./login"));

router.use(isAuth);
router.put("/:id", require("./update"));
router.delete("/logout", require("./logout"));
router.delete("/:id", require("./delete"));

module.exports = router;