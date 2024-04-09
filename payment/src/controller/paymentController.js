// app/controllers/paymentController.js
const Razorpay = require('razorpay');
const config = require('../../config');
const crypto = require('crypto')
const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpayKeySecret
});

exports.createOrder = async (req, res) => {
    // Logic to create order
    try {
        const amount = 1000; // Amount in paisa (e.g., ₹10)
        const currency = 'INR';
        const receipt = 'order_rcptid_11';

        const options = {
            amount: amount,
            currency: currency,
            receipt: receipt,
            payment_capture: '1' // Auto-capture
        };

        const response = await razorpay.orders.create(options);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create order');
    }
};

exports.paymentSuccess = (req, res) => {
    // Logic to handle payment success
    res.render('success');
};

exports.webhook = (req, res) => {
    // Logic to handle webhook notifications
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    // Verify the payment
    const generated_signature = crypto.createHmac('sha256', config.razorpayKeySecret).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex');
    console.log(generated_signature);
    if (generated_signature === razorpay_signature) {
        // Payment successful, handle accordingly
        // For example, update database, send email, etc.
        res.status(200).send('Webhook received successfully');
    } else {
        // Invalid signature, handle accordingly
        res.status(400).send('Invalid signature');
    }
};
