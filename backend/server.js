const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const marcacaoRouter = require("./routes/marcacaoroute");

require("dotenv").config();

//MONGO DB connection
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
connection.once("open", () => {
  console.log("mongoDB connection success");
});

//server connection
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/marcacoes", marcacaoRouter);

app.listen(port, () => {
  console.log(`listening from port: ${port}`);
});
