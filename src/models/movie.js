const model = {}
const db = require('../config/db')
const format = require("pg-format")
const cloudinary = require("../helpers/cloudinary")

model.GetAll = async(pagination) => {
    try {
        let query = format(`SELECT * FROM public.movie`)
        if (pagination.order) {
            query = format(`${query} ORDER BY %s DESC`, pagination.order)
        } else {
            query = format(`${query} ORDER BY id_movie DESC`)
        }
        const offset = (pagination.page - 1) * pagination.limit
        query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset)
        const movie = await db.query(query)
        return movie.rows
    } catch (error) {
        throw error
    }
}

model.GetById = async(id_movie) => {
    try {
        const movie = await db.query(
            `SELECT * FROM public.movie WHERE id_movie=$1`, [id_movie]
        )
        return movie.rows
    } catch (error) {
        throw error
    }
}

model.Add = async(data) => {
    try {
        const pushImage = await cloudinary.push(movie.image)
        db.query(`INSERT INTO public.movie (title, genre, release_date, directed_by,
            duration, casts, synopsis)
        VALUES($1, $2, $3, $4, $5, $6, $7)`, [
            data.title,
            data.genre,
            data.release_date,
            data.directed_by,
            data.duration,
            data.casts,
            data.synopsis,
            pushImage.secure_url,
        ])
        return "Data has been Add"
    } catch (error) {
        throw error
    }
}


model.Update = async(data) => {
    try {
        let image = ""
        if (data.path) {
            const movie = await db.query(`SELECT * FROM public.movie WHERE id_movie=$1`, [data.id_movie])
            await cloudinary.delete(movie)
            const upload = await cloudinary.push(data.path)
            image = upload.secure_url
        }

        await db.query(`UPDATE public.movie 
    SET 
    title = COALESCE(NULLIF($1, ''), title),
    genre = COALESCE(NULLIF($2, ''), genre),
    release_date = COALESCE(NULLIF($3, ''), release_date),
    directed_by = COALESCE(NULLIF($4, ''), directed_by),
    duration = COALESCE(NULLIF($5, ''), duration),
    casts = COALESCE(NULLIF($6, ''), casts),
    synopsis = COALESCE(NULLIF($7, ''), synopsis),
    image = COALESCE(NULLIF($8, ''), image)
    WHERE id_movie = $9`, [data.title,
            data.genre,
            data.release_date,
            data.directed_by,
            data.duration,
            data.casts,
            data.synopsis,
            image,
            data.id_movie

        ])
        return "Data has been Updated!"
    } catch (error) {
        throw error
    }
}

model.Delete = async(data) => {
    try {
        const movie = await db.query(
            `SELECT * FROM public.movie WHERE id_movie=$1`, [data.id_movie]
        )
        await cloudinary.delete(movie)
        await db.query(`DELETE FROM public.movie WHERE id_movie=$1`, [
            data.id_movie,
        ])
        return "Data has been Deleted!"
    } catch (error) {
        throw error
    }
};


model.SearchTitle = (movie) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.movie WHERE LOWER(title) LIKE '%' || $1 || '%'`, [movie])
            .then((data) => {
                resolve(data.rows)
            }).catch((error) => {
                reject(error)
            })
    })
}

model.SearchYear = (date) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.movie WHERE LOWER(release_date) LIKE '%' || $1 || '%'`, [date])
            .then((data) => {
                resolve(data.rows)
            }).catch((error) => {
                reject(error)
            })
    })
}

model.Sort = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT title, release_date FROM public.movie ORDER BY release_date ASC`)
            .then((data) => {
                resolve(data.rows)
            }).catch((error) => {
                reject(error)
            })
    })
}


module.exports = model