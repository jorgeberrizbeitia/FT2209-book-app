const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  // author: {
  //   type: mongoose.Schema.Types.ObjectId, // el tipo será un ID de un documento de cualquier colección
  //   ref: "Author" // a que colección pertenece esta relacion
  // }
  author: [{
    type: mongoose.Schema.Types.ObjectId, // el tipo será un ID de un documento de cualquier colección
    ref: "Author" // a que colección pertenece esta relacion
  }] // ahora será un array de IDs
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book