const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// rutas de libros
const bookRoutes = require("./book.routes.js")
router.use("/books", bookRoutes)
// "/" significa, que el URL empiece en "/", cualquier llamada

module.exports = router;
