const { client } = require("../../helper");
const { getItem } = require("../services/apiCall.service");


const addtocart = async (req, res, next) => {

  const id = req.params.id;
  const userId = req.user.id
  


  const token = req.headers['authorization']
  //   internal api call using aixos
  const item = await getItem(id, token);
  const { dish_name, price } = item
  const updated_by = Date.now()
  const quantity = req.body.quantity

  const object = {
    id,
    dish_name,
    price,
    quantity,
  };


  const items = [object]
  const dishes = {items,  updated_by }

  if (await client.exists(`user:${userId.toString()}`) == 0) {
    const setItem = await client.set(`user:${userId.toString()}`, JSON.stringify(dishes))
  
  }

  const list = JSON.parse(await client.get(`user:${userId.toString()}`));
 

  const isExist = (list.items.findIndex(x => x.id == `${id}`))
  const existQuantity = (list.items.find(x => x.quantity == `${quantity}`))

  if (isExist < 0) {
    list.items.push(object)
    list.updated_by = Date.now()
  }

  else if (isExist >= 0 && existQuantity != quantity) {
    (list.items)[isExist].quantity = quantity
    list.updated_by = Date.now()
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
  else{
    return res.json({Message: "Cart is already Empty"})
  }

}



module.exports = { addtocart, getCart, deletecart } 