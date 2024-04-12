// app/controllers/paymentController.js
const Razorpay = require('razorpay');
const config = require('../../config');
const crypto = require('crypto');
const { getItem } = require('../service/apiCall');
const paymntDal = require('../dal/paymnt.dal');
const axios = require("axios")


const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpayKeySecret
});

exports.createOrder = async (req, res, next) => {
    // Logic to create order

    const client = req.client


    const token = req.headers["authorization"];
    const amount = (await getItem(token)) * 100;
    const currency = 'INR';
    const receipt = 'order_rcptid_11';

    const options = {
        amount: amount,
        currency: currency,
        receipt: receipt,
        payment_capture: '1' // Auto-capture
    };

    const response = await razorpay.orders.create(options);

    if (response) {
        const orderId = '1'
        const razorpay_order_id = response.id

        const storePayment = await paymntDal.createPayment({ client, orderId, razorpay_order_id })

        if(storePayment.rowCount){
            res.json(response);
        }
        else {
            const err = new Error("Fail Order");
            err.statusCode = 500;
            next(err);
        }
       
    }
    else{

        const err = new Error("Internal Error");
        err.statusCode = 500;
        next(err);
    }
    


};

exports.paymentSuccess = async (req, res, next) => {

    const client = req.client
    const orderId = '1'
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const status = await (await razorpay.payments.fetch(razorpay_payment_id)).status
    if (razorpay_payment_id) {
        // Verify the payment
        const generated_signature = crypto.createHmac('sha256', config.razorpayKeySecret).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex');
        if (generated_signature === razorpay_signature) {

            // Payment successful, handle accordingly
            const update = await paymntDal.updatePayment({ client, orderId, razorpay_order_id, razorpay_payment_id, status })
            console.log(update);
            // For example, update database, send email, etc.
            // store payment data in database



            res.status(200).send(' Payment successful');
        } else {
            // Invalid signature, handle accordingly
            const err = new Error("Invalid Siganture");
            err.statusCode = 400;
            next(err);
        }
    } else {
        throw new Error("Payment not Initialized")
    }


};


