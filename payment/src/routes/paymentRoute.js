// app/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

router.get('/', (req, res) => {
    res.render('payment');
});

router.post('/create-order', paymentController.createOrder);
router.post('/payment/success', paymentController.paymentSuccess);
router.post('/payment/webhook', paymentController.webhook);

module.exports = router;
