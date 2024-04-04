
class userdal {
    async createUser({ client, username, hpassword, email, phone, role }) {
        const sql = `INSERT INTO users(username, password, email, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const values = [username, hpassword, email, phone, role]
        const result = await client.query(sql, values);
        return result
    }

    async findAdminByusername({ client, username, email }) {

        const sql = 'SELECT * FROM users WHERE username = $1 OR email = $2'
        const values = [username, email]
        const result = await client.query(sql, values);
        return result


    }

    async findUserByEmail({ client, email }) {

        const sql = 'SELECT * FROM users WHERE email = $1 '
        const values = [email]
        const result = await client.query(sql, values);
        return result
    }

    async findUserisverified({ client, email }) {

        const sql = 'SELECT isveryfied FROM users WHERE email = $1 '
        const values = [email]
        const result = await client.query(sql, values);
        return result
    }

    async changeVerifiedStatus({ client, user_id }) {
        const sql = 'UPDATE users SET isveryfied = true WHERE id = $1;'
        const values = [user_id]
        const result = await client.query(sql, values);
        return result
    }

}

module.exports = new userdal();