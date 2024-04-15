// app/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
const { getRequestHandler } = require('../../helper');
<<<<<<< HEAD

=======
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2


router.get('/', (req, res) => {
    res.render('payment.ejs');
});

<<<<<<< HEAD
router.post('/order',   getRequestHandler(paymentController.createOrder));
router.post('/success', getRequestHandler(paymentController.paymentSuccess));


module.exports = router;
       
=======
router.post('/order',  getRequestHandler(paymentController.createOrder));
router.post('/success', getRequestHandler(paymentController.paymentSuccess)); 


module.exports = router;
          
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2
