const router = require("express").Router();
const cors = require("cors");
const {FOREST_ENV_SECRET, FOREST_AUTH_SECRET} = require("../util/env");

if (FOREST_ENV_SECRET && FOREST_AUTH_SECRET){
    router.use("/forest", cors({
        origin: [/\.forestadmin\.com$/],
        allowedHeaders: ["Authorization", "X-Requested-With", "Content-Type"],
        credentials: true
    }));
    router.use(require("forest-express-sequelize").init({
        modelsDir: `${__dirname}/../db/models`,
        envSecret: FOREST_ENV_SECRET,
        authSecret: FOREST_AUTH_SECRET,
        sequelize: require("../db")
    }));
}

router.options("*", cors());

router.use(require("./middlewares/api-version"));
router.use(require("./middlewares/cluster-log"));

router.use("/item", require("./item"));
router.use("/user", require("./user"));
router.use("/sale", require("./sale"));

router.use(require("./middlewares/not-found"));
router.use(require("./middlewares/error-handler"));

module.exports = router;