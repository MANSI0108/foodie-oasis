// app/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');


router.get('/', (req, res) => {
    res.render('payment.ejs');
});

router.post('/order',  paymentController.createOrder);
router.post('/success', paymentController.paymentSuccess);


module.exports = router;
    