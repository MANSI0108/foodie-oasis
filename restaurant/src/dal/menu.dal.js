const pool = require("../config/db.config");


class menuDal {

    async createMenu({ category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id }) {
        const sql = `INSERT INTO restaurant_menu (category_id, restaurant_id, dish_name, description, price, createdBy, updatedBy, sub_category_id) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8) RETURNING *`
        const values = [category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id]
        const result = await pool.query(sql, values);
        return result
    }

    async getMenu_By_ID({ restaurant_id, category_id, sub_category_id }) {


        const sql = 'SELECT id,dish_name, price FROM restaurant_menu WHERE restaurant_id = $1 AND category_id = $2 AND sub_category_id= $3 '
        const values = [restaurant_id, category_id, sub_category_id]
        const result = await pool.query(sql, values);
        return result


    }

    async updateMenu({ category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id, id }) {
        const sql = `UPDATE restaurant_menu SET category_id = $1, restaurant_id=$2, dish_name=$3, description=$4, price=$5, createdBy=$6, updatedBy=$7, sub_category_id=$8 where id = $9;`
        const values = [category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id, id]
        const result = await pool.query(sql, values);
        return result
    }

    async getMenuID(id) {
        const sql = 'SELECT * FROM restaurant_menu WHERE id= $1 '
        const values = [id]
        const result = await pool.query(sql, values);
        return result
    }

    async deleteMenu(id) {

        const sql = 'delete from restaurant_menu where id = $1 ';
        const values = [id];
        const result = await pool.query(sql, values);
        return result
    }

    async modifyUpdatedAt(id) {
        const sql = `UPDATE restaurant_menu SET updatedAt=now() where id = $1;`
        const values = [id]
        const result = await pool.query(sql, values);
        return result
    }


}

module.exports = new menuDal();