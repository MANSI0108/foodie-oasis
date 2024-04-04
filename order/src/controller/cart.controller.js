const { client } = require("../../helper");
const { getItem } = require("../services/apiCall.service");


const addtocart = async (req, res, next) => {

  const id = req.params.id;
  const userId = req.user.id
  const token = req.rawHeaders[1]

  //   internal api call using aixos
  const item = await getItem(id, token);
  const { dish_name, price } = item
  const quantity = req.body.quantity

  const object = {
    id,
    dish_name,
    price,
    quantity
  }; 


  const dishes = [object]

  if (await client.exists(`user:${userId.toString()}`) == 0) {
    const setItem = await client.set(`user:${userId.toString()}`, JSON.stringify(dishes))

  }

  const list = JSON.parse(await client.get(`user:${userId.toString()}`));
  const isExist = (list.findIndex(x => x.id == `${id}`))
  const existQuantity = (list.find(x => x.quantity == `${quantity}`))

  if (isExist < 0) {
    list.push(object)
  }

  else if (isExist >= 0 && existQuantity != quantity) { 
    list[isExist].quantity = quantity
  }

  const container = await client.set(`user:${userId.toString()}`, JSON.stringify(list))

  if (container) {
    return res.json({ Massege: "added Item SuccessFully", container })
  }

}

const getCart = async (req, res, next) => {
  const userId = req.user.id
  const list = JSON.parse(await client.get(`user:${userId.toString()}`));
  res.json(list)

}

const deletecart = async (req, res, next) => {

  const userId = req.user.id
  const emptycart = await client.del((`user:${userId.toString()}`));
  if (emptycart) {
    return res.json({ Message: "Your Cart is Empty Now" })
  }

}



module.exports = { addtocart, getCart, deletecart } 