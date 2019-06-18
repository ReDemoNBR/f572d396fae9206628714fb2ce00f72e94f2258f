const router = require("express").Router();

router.use(require("./middlewares/api-version"));
router.use(require("./middlewares/cluster-log"));

router.use("/item", require("./item"));
router.use("/user", require("./user"));
// router.use("/sale", require("./sale"));

router.use(require("./middlewares/not-found"));
router.use(require("./middlewares/error-handler"));

module.exports = router;