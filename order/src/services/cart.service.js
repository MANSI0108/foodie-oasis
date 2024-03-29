const { client } = require("../../helper")
const cartDal = require("../dal/cart.dal")

const addItem = async ({ dish_name, price, quantity, createdby }) => {

    const dal_result = await cartDal.createCart({ dish_name, price, quantity, createdby })
    return dal_result.rows

}





module.exports = { addItem }