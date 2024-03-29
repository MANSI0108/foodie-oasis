const axios = require("axios")

const getItem = async (id,token) => {
    
    const menuId = id;
 
    
    const response = await axios.get(`http://127.0.0.1:3001/foodApp/menu/getMenu/${menuId}`,{
        headers: {
            'Authorization': token
        }
    })

    const user = response.data;
   
    return user.Item[0]
     
}

module.exports = {getItem}  