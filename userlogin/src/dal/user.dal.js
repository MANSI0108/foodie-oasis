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

    async findUserByEmail(email){

        const sql = 'SELECT * FROM users WHERE email = $1 '
        const values = [ email]
        const result = await pool.query(sql, values);
        return result
    }

    async findUserisverified(email){

        const sql = 'SELECT isveryfied FROM users WHERE email = $1 '
        const values = [ email]
        const result = await pool.query(sql, values);
        return result
    }

    async changeVerifiedStatus(user_id) {
        const sql = 'UPDATE users SET isveryfied = true WHERE id = $1;'
        const values = [user_id]
        const result = await pool.query(sql, values);
        return result
    }

}

module.exports= new userdal();