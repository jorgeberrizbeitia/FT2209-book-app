// middleware que envia el archivo a cloudinary
// configuracion de la documentacion de cloudinary

const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

console.log(process.env.CLOUD_NAME)
// pasar las credenciales de cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// crea las configuraciones del bundle
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ["jpg", "png"],
    folder: "patata"
  }
})

const uploader = multer({
  storage
})

module.exports = uploader