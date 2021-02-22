const router = require("express").Router();
const Marcacao = require("../models/marcacoes");

//GET marcacoes
router.route("/").get((req, res) => {
  Marcacao.find()
    .then((marcacoes) => res.json(marcacoes))
    .catch((err) => res.status(400).json("Error:" + err));
});

//Add Marcacoes
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const contact = req.body.contact;
  const reason = req.body.reason;
  const date = req.body.date;
  const hour = req.body.hour;

  const newMarcacao = new Marcacao({ name, age, contact, reason, date, hour });

  newMarcacao
    .save()
    .then((resp) => {
      res.json("marcacao add!");
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//Get individual marcacao
router.route("/:id").get((req, res) => {
  Marcacao.findById(req.params.id)
    .then((marcacoes) => res.json(marcacoes))
    .catch((err) => res.status(400).json("Error:" + err));
});

//Delete marcacao
router.route("/:id").delete((req, res) => {
  Marcacao.findByIdAndDelete(req.params.id)
    .then(() => res.json("marcacao deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//Update Marcacao
router.route("/:id").post((req, res) => {
  Marcacao.findByIdAndUpdate(req.params.id)
    .then((marcacao) => {
      marcacao.name = req.body.name;
      marcacao.age = req.body.age;
      marcacao.contact = req.body.contact;
      marcacao.reason = req.body.reason;
      marcacao.hour = req.body.hour;
      marcacao.date = req.body.date;

      marcacao.save().then(() => res.json("marcacao updated"));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
