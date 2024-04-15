const paymentDal = require("../dal/payment.dal")

const savePaymentService = async ({ client, orderid, razorpay_order_id }) => {

    const result = await paymentDal.createPayment({ client, orderid, razorpay_order_id })
    return result
}

const updatePaymentService = async ({ client, razorpay_order_id, razorpay_payment_id, status }) => {

    const result = await paymentDal.updatePayment({ client, razorpay_order_id, razorpay_payment_id, status })
    return result
}
 
module.exports = { savePaymentService, updatePaymentService }  