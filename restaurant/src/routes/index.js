const express = require("express");
const router = express.Router({ mergeParams: true })

router.use("/menu", require("./menuRoute"))
router.use("/",require("./restaurant"))


module.exports = router;