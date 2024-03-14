const pool = require("../config/db.config.js");

class userdal {
    async createUser(username, email, password, phone, role) {
        const sql = `INSERT INTO users(username, password, email, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const values = [username, password, email, phone, role]
        const result = await pool.query(sql, values);
        return result
    }

    async findAdminByusername(username, email) {
        
            
        const sql = 'SELECT * FROM users WHERE username = $1 OR email = $2'
        const values = [username, email]
        const result = await pool.query(sql, values);
        return result
        
   
    }
}

module.exports= new userdal();