const model = {}
const db = require('../config/db')
const format = require("pg-format")

model.GetAll = async(pagination) => {
    try {
        let query = format(`SELECT * FROM public.booking`)
        if (pagination.order) {
            query = format(`${query} ORDER BY %s DESC`, pagination.order)
        } else {
            query = format(`${query} ORDER BY id_booked DESC`)
        }
        const offset = (pagination.page - 1) * pagination.limit
        query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset)
        const booked = await db.query(query)
        return booked.rows
    } catch (error) {
        throw error
    }
}
model.Add = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.booking (movie_selected, "date", "time", ticket_price,
        seat_choosed, total_payment) VALUES($1, $2, $3, $4, $5, $6)`, [
                data.movie_selected,
                data.date,
                data.time,
                data.ticket_price,
                data.seat_choosed,
                data.total_payment
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
    const query = `UPDATE public.booking 
    SET 
    movie_selected = COALESCE(NULLIF($1, ''), movie_selected),
    "date" = COALESCE(NULLIF($2, ''), "date"),
    "time" = COALESCE(NULLIF($3, ''), "time"),
    ticket_price = COALESCE(NULLIF($4, 0), ticket_price),
    seat_choosed = COALESCE(NULLIF($5, ''), seat_choosed),
    total_payment = COALESCE(NULLIF($6, 0), total_payment)
        WHERE id_booked = $7`

    return new Promise((resolve, reject) => {
        db.query(query, [
                data.movie_selected,
                data.date,
                data.time,
                data.ticket_price,
                data.seat_choosed,
                data.total_payment,
                id
            ])
            .then((data) => {
                resolve('Data has been successfully Updated')
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

model.Delete = (id_booked) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.booking WHERE id_booked=$1`, [
                id_booked
            ])
            .then(() => {
                resolve('Data has been Deleted')
            }).catch((error) => {
                reject(error)
            })

    })

}


model.Search = (booked) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.booking WHERE LOWER(movie_selected) LIKE '%' || $1 || '%'`, [booked])
            .then((data) => {
                resolve(data.rows)
            }).catch(err => {
                reject(err)
            })
    })
}

model.Sort = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.booking ORDER BY id_booked ASC`)
            .then((data) => {
                resolve(data.rows)
            }).catch(err => {
                reject(err)
            })
    })
}

module.exports = model