const axios = require("axios")

const getItem = async ( token) => {




    const response = await axios.get(`${process.env.INTERNAL_API_AMOUNT}`, {
        headers: {
            'Authorization': token
        }
    })

    // console.log(response.user);

    const amount = response.data.total_amount;
 
    return amount

}

module.exports = { getItem}   