const mongoose = require("mongoose");
const Schema = mongoose.Schema; //the Schema define the properties of the document, and the model wraps the Schema and makes it accessible

const marcacaoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      require: true,
    },
    hour: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
); // timestamps

const Marcacao = mongoose.model("Marcacao", marcacaoSchema); //model will plurary the 'Blog' paramenter and will retrieve the colection from DB, the parameter should have the same name as the model

module.exports = Marcacao;
