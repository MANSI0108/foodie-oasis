const express = require("express");
const { registerMenu, getMenu, updateMenu, deleteMenu, getMenuByID } = require("../controller/menu.controller");
const { isOwner, getRequestHandler } = require("../../helper");
const { handleMenuData } = require("../middleware/menu.validation");
const router = express.Router({ mergeParams: true })


router
    .route('/addMenu')
    .post(isOwner, handleMenuData, getRequestHandler(registerMenu));

router
    .route('/getMenu')
    .get(getRequestHandler(getMenu))

router
    .route('/getMenu/:id')
    .get(getRequestHandler(getMenuByID))

router
    .route('/updateMenu/:id')
    .patch(isOwner, handleMenuData, getRequestHandler(updateMenu))

router
    .route('/deleteMenu/:id')
    .delete(isOwner, getRequestHandler(deleteMenu))


module.exports = router