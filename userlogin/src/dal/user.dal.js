const pool = require("../config/db.config.js");

class userdal {
    async createUser(username, email, password, phone) {
        const sql = `INSERT INTO userdata(username, password, email, phone) VALUES ($1, $2, $3, $4) RETURNING *`
        const values = [username, password, email, phone]
        const result = await pool.query(sql, values);
        return result
    }

    async findAdminByusername(username, email) {
        
            
        const sql = 'SELECT * FROM userdata WHERE username = $1 OR email = $2'
        const values = [username, email]
        const result = await pool.query(sql, values);
        return result
        
   
    }
}

module.exports= new userdal();