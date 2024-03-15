const pool = require("../config/db.config.js");

class emailverifyTokenDal {
    async createToken(token,user_id) {
        const sql = `INSERT INTO emailverificationtoken(token,user_id) VALUES ($1, $2) RETURNING *`
        const values = [token,user_id]
        const result = await pool.query(sql, values);
        return result
    }
   
    async findToken(user_id) {
        const sql = 'SELECT token FROM emailverificationtoken WHERE user_id = $1 '
        const values = [user_id]
        const result = await pool.query(sql, values);
        return result
    }

    async deleteToken(user_id) {
        const sql = 'Delete From emailverificationtoken WHERE user_id = $1'
        const values = [user_id]
        const result = await pool.query(sql, values);
        return result
    }
    


}

module.exports= new emailverifyTokenDal();
