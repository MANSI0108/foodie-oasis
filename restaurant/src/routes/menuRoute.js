const express = require("express");
const { registerMenu, getMenu, updateMenu, deleteMenu, getMenuByID, getMenuBySubCategoryID, getCategory } = require("../controller/menu.controller");
const { isOwner, getRequestHandler } = require("../../helper");
const { handleMenuData } = require("../middleware/menu.validation");
const router = express.Router({ mergeParams: true })


router
    .route('/add')
    .post(isOwner, handleMenuData, getRequestHandler(registerMenu));

router
    .route('/')
    .get(getRequestHandler(getMenu))

router
    .route('/categoryList')
    .get(getRequestHandler(getCategory))


router
    .route('/:id')
    .get(getRequestHandler(getMenuByID))

router
    .route('/update/:id')
    .patch(isOwner, handleMenuData, getRequestHandler(updateMenu))

router
    .route('/delete/:id')
    .delete(isOwner, getRequestHandler(deleteMenu))

router
    .route('/all/:subCategoryID')
    .get(getRequestHandler(getMenuBySubCategoryID))




module.exports = router