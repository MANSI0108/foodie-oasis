const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { registerMenu, getMenu, updateMenu, deleteMenu } = require("../controller/menu.controller");
const {isOwner} = require("../../helper");
const { handleMenuData, menuExist } = require("../middleware/menu.validation");
const router = express.Router({ mergeParams: true })


router
    .route('/addMenu')
    .post(verifyToken, isOwner, handleMenuData, registerMenu);

router
    .route('/getMenu')
    .get(verifyToken, isOwner, getMenu )    

router
    .route('/updateMenu/:id')
    .patch(verifyToken, isOwner, menuExist, handleMenuData, updateMenu)

router
    .route('/deleteMenu/:id')
    .delete(verifyToken, isOwner, menuExist, deleteMenu)    

    
module.exports = router