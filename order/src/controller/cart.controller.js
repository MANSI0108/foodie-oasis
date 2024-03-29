const { client } = require("../../helper");
const { getItem } = require("../services/apiCall.service");
const { itemList } = require("../services/cart.service");



const addtocart = async (req, res, next) => {

  const id = req.params.id;
  const userId = req.user.id
  const token = req.rawHeaders[1]

  //   internal api call using aixos
  const item = await getItem(id, token);
  console.log(item);
  const { dish_name, price, createdby } = item
  const quantity = req.body.quantity

  const object = {
    dish_name,
    price,
    quantity
  };

  if(await client.exists(`user:${userId.toString()}`) == 0){
    const setItem = await client.set(`user:${userId.toString()}`, JSON.stringify({cart:[]}))
  }
  
  const list = JSON.parse (await client.get (`user:${userId.toString()}`));
  list.cart.push(object)

  const container = await client.set(`user:${userId.toString()}`, JSON.stringify(list))

  if (container) {
    return res.json("added Item SuccessFully")
  }

}

const getCart = async (req, res, next) => {
  const userId = req.user.id
  const list = JSON.parse (await client.get (`user:${userId.toString()}`));
  res.json(list)

}

module.exports = { addtocart, getCart } 