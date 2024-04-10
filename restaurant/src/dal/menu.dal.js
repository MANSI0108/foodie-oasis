const pool = require("../config/db.config");


class menuDal {

    async createMenu({ client, category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id }) {
        const sql = `INSERT INTO restaurant_menu (category_id, restaurant_id, dish_name, description, price, createdBy, updatedBy, sub_category_id) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8) RETURNING *`
        const values = [category_id, restaurant_id, dish_name, description, price, created_by, updated_by, sub_category_id]
        const result = await client.query(sql, values);
        return result
    }

    async getMenu({ sort, sortBy, sortType, search, client, restaurant_id, category_id, sub_category_id, page }) {
        const limit = 10;
        const offset = (page-1)*limit
        const str = "SELECT id, dish_name, price FROM restaurant_menu WHERE restaurant_id = $1 AND category_id = $2 AND sub_category_id= $3"
        var sql = ""

        if (sort && search) {
            sql = `${str} AND dish_name LIKE '%${search}%' ORDER BY ${sortBy} ${sortType} LIMIT ${limit} OFFSET ${offset}`
        }
        else if (sort) {
            sql = `${str} ORDER BY ${sortBy} ${sortType} LIMIT ${limit} OFFSET ${offset}`
        }
        else if (search) {
            sql = `${str} AND dish_name LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset} `
        }
        else {
            sql = str
        }

     
        const values = [restaurant_id, category_id, sub_category_id]
        const result = await client.query(sql, values);
        return result


    }

    async updateMenu({ client, category_id, dish_name, description, price, created_by, updated_by, sub_category_id, id }) {
        const sql = `UPDATE restaurant_menu SET category_id = $1, dish_name=$2, description=$3, price=$4, createdBy=$5, updatedBy=$6, sub_category_id=$7 where id = $8;`
        const values = [category_id, dish_name, description, price, created_by, updated_by, sub_category_id, id]
        const result = await client.query(sql, values);
        return result
    }

    async getMenuID({ client, menu_id }) {

        const sql = `SELECT * FROM restaurant_menu WHERE id= $1 `
        const values = [menu_id]
        const result = await client.query(sql, values);
        return result
    }

    async getMenuByRestaurantID({ client, menu_id, restaurant_id }) {
        const sql = `select * from restaurant_menu where id = $1 AND restaurant_id = $2`
        const values = [menu_id, restaurant_id]
        const result = await client.query(sql, values);
        return result
    }

    async deleteMenu({ client, menu_id }) {

        const sql = 'delete from restaurant_menu where id = $1 ';
        const values = [menu_id];
        const result = await client.query(sql, values);
        return result
    }

    async modifyUpdatedAt({ client, id }) {
        const sql = `UPDATE restaurant_menu SET updatedAt=now() where id = $1;`
        const values = [id]
        const result = await client.query(sql, values);
        return result
    }


}

module.exports = new menuDal();