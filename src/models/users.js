const model = {}
const db = require("../config/db");
const format = require("pg-format");

model.GetUsers = async(pagination) => {
    try {
        let query = format(`SELECT * FROM public.users`)
        if (pagination.order) {
            query = format(`${query} ORDER BY %s DESC`, pagination.order)
        } else {
            query = format(`${query} ORDER BY created_at DESC`)
        }
        const offset = (pagination.page - 1) * pagination.limit
        query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset)
        const users = await db.query(query)
        return users.rows
    } catch (error) {
        throw error
    }
}

model.GetByUsers = (username) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.users WHERE username=$1`, [
                username
            ])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

model.Add = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.users (username, "password", role) VALUES($1, $2, $3)`, [
                data.username,
                data.hashPassword,
                data.role
            ])
            .then(() => {
                resolve("Users data has been Added")
            })
            .catch((error) => {
                reject(error)
            })
    })
}

model.Update = (uname, data) => {
    const query = `UPDATE public.users
   SET 
       username = COALESCE(NULLIF($1, ''), username),
       password = COALESCE(NULLIF($2, ''), password),
       role = COALESCE(NULLIF($3, ''), role)
       WHERE username= $4`
    return new Promise((resolve, reject) => {
        db.query(query, [
                data.username,
                data.Password,
                data.role,
                uname
            ])
            .then(() => {
                resolve("Users Data has been Updated!")
            })
            .catch((error) => {
                reject(error);
            });
    });
};

model.Delete = (uname) => {
    return new Promise((resolve, reject) => {
        DB.query(`DELETE FROM public.users WHERE username=$1`, [uname])
            .then(() => {
                resolve("Data has been Deleted!")
            })
            .catch((error) => {
                reject(error);
            });
    });
};

module.exports = model;