const express = require('express');
const router = express.Router();
const Book = require("../models/Book.model.js")
const Author = require("../models/Author.model.js")
const uploader = require("../middlewares/cloudinary.js")
console.log(uploader)

// READ (LEER)

// GET "/books" => ruta donde el usuario pueda ver una lista de todos los libros en la BD
router.get("/", (req, res, next) => {
  
  Book.find() // busca todos los libros de la BD
  // Book.find({author: "JK Rowling"})
  // .select("title author")
  // .select({title: 1, author: 1})
  .select("title") // dame solo la propiedad title
  .then((response) => {
    console.log(response)
    res.render("books/list.hbs", {
      bookList: response
    })
  })
  .catch((error) => {
    next(error)
  })
  
})

// GET "/books/:bookId/details" => ruta para renderizar los detalles de un libro
router.get("/:bookId/details", (req, res, next) => {

  let { bookId } = req.params

  Book.findById(bookId)
  .populate("author") // busca en la colección correspondiente esta propiedad
  // Book.findOne({title: title})
  .then((response) => {
    console.log(response)

    // console.log(".author", response.author)

    res.render("books/details.hbs", {
      details: response
    })
    
  })
  .catch((error) => {
    next(error)
  })

})


// CREATE (CREAR)

// GET "/books/create" => ruta para renderizar un formulario de crear libro al usuario
router.get("/create", async (req, res, next) => {

  try {
    // antes de renderizar, voy a buscar todos los autores de la BD
    const authorList = await Author.find()
    res.render("books/create.hbs", {
      authorList
    })
  } catch (error) {
    next(error)
  }

})

// POST "/books/create" => ruta para recibir la data del formulario y crear un libro

// antes de llegar a la funcion de la ruta, pasa por cloudinary
router.post("/create", uploader.single("cover"), (req, res, next) => {

  console.log("req.file.path", req.file) // esto viene de cloudinary y es el URL de acceso a la image

  console.log(req.body) // aqui vendrá todos los datos del formulario

  // 1. usar la data para crear un nuevo libro
  // const { title, description, author } = req.body

  let bookToAdd = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    cover: req.file.path // https://cloudinary.com/my-image-patata.jpg
  }

  Book.create(bookToAdd)
  .then((response) => {
    console.log("libro añadido correctamente")
    // 2. hacer algo con el usuario
    res.redirect("/books")
    // no confundir redirect con render
    // render apunta a un .hbs
    // redirect apunta a una ruta (el usuario hiciera click en este enlace)


  })
  .catch((error) => {
    next(error)
  })


})

// UPDATE (ACTUALIZAR)
// GET "/books/:bookId/edit" => renderizar un formulario incluyendo la data actual del libro
router.get("/:bookId/edit", (req, res, next) => {

  const { bookId } = req.params

  // buscar los detalles del libro para pasarle a la vista
  Book.findById(bookId)
  .then((response) => {
    res.render("books/edit-form.hbs", {
      details: response
    })
  })
  .catch((error) => {
    next(error)
  })

})

// POST "/books/:bookId/edit" => recibir los valor para actualizar el libro y redireccionar
router.post("/:bookId/edit", (req, res, next) => {

  // recibir la data a a editar
  const { bookId } = req.params
  // req.body
  const { title, description, author } = req.body
  console.log(req.body)

  const bookUpdate = {
    title, 
    description,
    author
  }

  // actualizar el libro
  Book.findByIdAndUpdate(bookId, bookUpdate)
  .then(() => {
    // redireccionar al usuario
    // res.redirect("/books")
    // queremos hacer una redirección a los detalles
    res.redirect(`/books/${bookId}/details`)
  })
  .catch((error) => {
    next(error)
  })


})




// DELETE (BORRAR)
// POST "/books/:bookId/delete"
router.post("/:bookId/delete", (req, res, next) => {

  // 1. buscar el libro por su id y borrarlo
  Book.findByIdAndDelete(req.params.bookId)
  .then(() => {
    // 2. redireccionar a "/books"
    res.redirect("/books")
  })
  .catch((error) => {
    next(error)
  })


})


module.exports = router;
// siempre necesitamos estas linear para crear nuevos archivos de ruta
// - require express
// - crear router
// - exportar router