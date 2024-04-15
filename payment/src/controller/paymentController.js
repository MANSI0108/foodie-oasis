// app/controllers/paymentController.js
const Razorpay = require('razorpay');
const config = require('../../config');
const crypto = require('crypto');
const { getOrder, saveOrder } = require('../service/internalApi.service');
const { savePaymentService, updatePaymentService } = require('../service/payment.service');


const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpayKeySecret
});

exports.createOrder = async (req, res, next) => {
    // Logic to create order 
    const client = req.client
    const currency = 'INR';

    //internal api call Service
    const token = req.headers['authorization'];
    const data = await getOrder(token)

    const receipt = `order_rcptid_${data.orderID}`;
    const options = {
        amount: data.total_amount,
        currency: currency,
        receipt: receipt,
        payment_capture: '1' // Auto-capture
    };

    const response = await razorpay.orders.create(options);

    //store data in PaymentDB
    const orderid = data.orderID
    const razorpay_order_id = response.id


    const storeData = await savePaymentService({ client, orderid, razorpay_order_id })
    if (storeData.rowCount) {
        res.json(response);
    }
    else {
        const err = new Error("Order Failed")
        next(err)
    }



};

exports.paymentSuccess = async (req, res, next) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const client = req.client
    if (razorpay_payment_id) {
        // Verify the payment
        const generated_signature = crypto.createHmac('sha256', config.razorpayKeySecret).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex');
        if (generated_signature === razorpay_signature) {

            // Payment successful &  update database 
            const payment = await razorpay.payments.fetch(razorpay_payment_id)
            const status = payment.status

            const updateData = await updatePaymentService({ client, razorpay_order_id, razorpay_payment_id, status })
            if (updateData.rowCount) {

                //internal api call Service
                const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJDb3NpbmUwNyIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxMzE3NjgwNiwiZXhwIjoxNzEzMTc3NDA2fQ.SbeibJwZmTX1hIMLM9I_VG_Z4c2lT4GuxVuOkLevZlg`;

                const data1 = await getOrder(token)
                const orderid = data1.orderID
                const data = await saveOrder({ token, orderid, razorpay_payment_id })
                if (data.status ==  200) {
                    return res.status(200).send(' Payment successful');
                }
                else {
                    const err = new Error("Payment Failed");
                    err.statusCode = 402
                    next(err)
                }
            }
            else {
                res.status(402).send("Payment Failed")
            }


        } else {

            const err = new Error("Invalid Signature");
            err.statusCode = 401
            next(err)
        }
    }

    else {
        const err = new Error("Payment Not Succeeded");
        err.statusCode = 401
        next(err)
    }





};


