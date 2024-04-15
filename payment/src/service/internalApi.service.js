const axios = require("axios")

const getOrder = async ( token) => {

    const response = await axios.get(`${process.env.INTERNAL_API_AMOUNT}`, {
        headers: {
            'Authorization': token
        }
    }) 

    const user = response.data;
 
    return user
   
}

const saveOrder = async({token, orderid, razorpay_payment_id})=>{

   try {
    const response = await axios.patch(`${process.env.INTERNAL_API_PAYMENTID}`,{orderid,razorpay_payment_id},{
        headers: {
            'Authorization': token
        }
    })
   
    return response
   } catch (error) {
    
    throw error 
   }

    
}


module.exports = { getOrder, saveOrder }  