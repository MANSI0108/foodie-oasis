// app/controllers/paymentController.js
const Razorpay = require('razorpay');
const config = require('../../config');
const crypto = require('crypto');
<<<<<<< HEAD
const { getItem } = require('../service/apiCall');
const paymntDal = require('../dal/paymnt.dal');
const axios = require("axios")
=======
const { getOrder, saveOrder } = require('../service/internalApi.service');
const { savePaymentService, updatePaymentService } = require('../service/payment.service');
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2


const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpayKeySecret
});

exports.createOrder = async (req, res, next) => {
<<<<<<< HEAD
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
    
=======
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

>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2


};

exports.paymentSuccess = async (req, res, next) => {
<<<<<<< HEAD

    const client = req.client
    const orderId = '1'
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const status = await (await razorpay.payments.fetch(razorpay_payment_id)).status
=======
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const client = req.client
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2
    if (razorpay_payment_id) {
        // Verify the payment
        const generated_signature = crypto.createHmac('sha256', config.razorpayKeySecret).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex');
        if (generated_signature === razorpay_signature) {

<<<<<<< HEAD
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
=======
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
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2
    }

    else {
        const err = new Error("Payment Not Succeeded");
        err.statusCode = 401
        next(err)
    }



};


