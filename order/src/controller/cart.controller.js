const { client } = require("../../helper");
const { getItem } = require("../services/apiCall.service");


const addtocart = async (req, res, next) => {

  const id = req.params.id;
  // console.log(id);
  const userId = req.user.id
  const token = req.rawHeaders[1]

  //   internal api call using aixos
  const item = await getItem(id, token);
  console.log(item);
  const { dish_name, price } = item
  const quantity = req.body.quantity

  const object = {
    dish_name,
    price,
    quantity
  }; 

  const dishes = {
    [id] : object
  }

  if(await client.exists(`user:${userId.toString()}`) == 0){
    const setItem = await client.set(`user:${userId.toString()}`, JSON.stringify({items:dishes}))
  }
  
  const list =  JSON.parse(await client.get (`user:${userId.toString()}`));

  if(list.items.id != id){
    list.items[id] = object
  }
  else if(list.items.id.quantity != quantity && list.items.id == id){
    list.items.id.quantity = quantity
  }

  const container = await client.set(`user:${userId.toString()}`, JSON.stringify(list))

  if (container) {
    return res.json({Massege:"added Item SuccessFully", container})
  }

}

const getCart = async (req, res, next) => {
  const userId = req.user.id
  const list = JSON.parse (await client.get (`user:${userId.toString()}`));
  res.json(list)

}

const deletecart = async(req,res,next)=>{
 
   const userId = req.user.id
   const emptycart = await client.del((`user:${userId.toString()}`));
   if(emptycart){
    return res.json({Message:"Your Cart is Empty Now"})
   }

}


 
module.exports = { addtocart, getCart, deletecart} 