const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

cloudinary.push = async(image) => {
    const upload = await cloudinary.uploader.upload(image, {
        folder: "Tickitz",
        use_filename: true,
        unique_filename: false,
    });
    return upload;
}

cloudinary.delete = async(movie) => {
    const filename = `Tickitz${
    movie.rows[0].image
      .split("Tickitz")[1]
      .split(".png")[0]
      .split(".jpg")[0]
      .split(".jpeg")[0]
  }`
    await cloudinary.uploader.destroy(filename, (result) => {
        console.log("Data has been Deleted!")
    })
}



module.exports = cloudinary