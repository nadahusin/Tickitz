const model = {}
const db = require('../config/db')
const format = require("pg-format")

model.GetAll = async(pagination) => {
    try {
        let query = format(`SELECT * FROM public.schedule`)
        if (pagination.order) {
            query = format(`${query} ORDER BY %s DESC`, pagination.order)
        } else {
            query = format(`${query} ORDER BY id_schedule DESC`)
        }
        const offset = (pagination.page - 1) * pagination.limit
        query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset)
        const schedule = await db.query(query)
        return schedule.rows
    } catch (error) {
        throw error
    }
}

model.Add = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.schedule ("month", title, "day", "time") VALUES($1, $2, $3, $4)`, [
                data.month,
                data.title,
                data.day,
                data.time
            ])
            .then(() => {
                resolve('Data has been successfully Added')
            })
            .catch((error) => {
                reject(error)
            })
    })
}

model.Update = (id, data) => {
    const query = `UPDATE public.schedule 
    SET 
    month = COALESCE(NULLIF($1, ''), month),
    title = COALESCE(NULLIF($2, ''), title),
    day = COALESCE(NULLIF($3, ''), day),
    time = COALESCE(NULLIF($4, ''), time)
        WHERE id_schedule = $5`

    return new Promise((resolve, reject) => {
        db.query(query, [
                data.month,
                data.title,
                data.day,
                data.time,
                id
            ])
            .then(() => {
                resolve('Data has been successfully Updated')
            })
            .catch((error) => {
                reject(error)
            })
    })
}


model.Delete = (id_schedule) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.schedule WHERE id_schedule=$1`, [
                id_schedule
            ])
            .then(() => {
                resolve('Data has been Deleted')
            }).catch((error) => {
                reject(error)
            })

    })

}

model.Search = (schedule) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.schedule WHERE LOWER(title) LIKE '%' || $1 || '%'`, [schedule])
            .then((data) => {
                resolve(data.rows)
            }).catch((error) => {
                reject(error)
            })
    })
}

model.Sort = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.schedule ORDER BY id_schedule ASC`)
            .then((data) => {
                resolve(data.rows)
            }).catch((error) => {
                reject(error)
            })
    })
}

module.exports = model