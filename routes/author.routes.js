const express = require('express');
const router = express.Router();
const Author = require("../models/Author.model.js")

// aqui irán nuestras rutas de autores

// CREAR

// GET "/authors/create" => ruta para renderizar un formulario de crear autores
router.get("/create", (req, res, next) => {
  res.render("authors/create.hbs")
})

// POST "/authors/create" => recibir data del formulario y crear un nuevo autor en la BD
// router.post("/create", (req, res, next) => {

//   const { name, country, yearBorn } = req.body

//   Author.create({
//     name,
//     country,
//     yearBorn
//   })
//   .then(() => {
//     res.redirect("/")
//   })
//   .catch((err) => {
//     next(err)
//   })
// })

// POST "/authors/create" => recibir data del formulario y crear un nuevo autor en la BD
router.post("/create", async (req, res, next) => {

  const { name, country, yearBorn } = req.body

  try {
    await Author.create({
      name,
      country,
      yearBorn
    })

    res.redirect("/authors")
    
  } catch (error) {
    next(error)
  }
})

// READ
// GET "/authors" => listar todos los autores de la BD
router.get("/", async (req, res, next) => {

  try {
  
    const authorList = await Author.find()
    res.render("authors/list.hbs", {
      authorList
    })

  } catch (error) {
    next(error)
  }

})

module.exports = router