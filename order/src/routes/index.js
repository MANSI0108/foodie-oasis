const express = require("express");
const router = express.Router({ mergeParams: true })

router.use("/cart", require("./cartRoute"))
router.use("/order",require("./orderRoute"))


module.exports = router;