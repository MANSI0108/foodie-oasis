// app/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
const { getRequestHandler } = require('../../helper');



router.get('/', (req, res) => {
    res.render('payment.ejs');
});

router.post('/order',   getRequestHandler(paymentController.createOrder));
router.post('/success', getRequestHandler(paymentController.paymentSuccess));


module.exports = router;
       

