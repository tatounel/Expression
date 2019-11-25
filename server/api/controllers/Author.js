const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { Author } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /authors
//    POST   /authors
//    GET    /authors/:id
//    PUT    /authors/:id
//    DELETE /authors/:id

router.get("/", (req, res) => {
  Author.findAll({}).then(authors => res.json(authors));
});

router.post("/", (req, res) => {
  let { user } = req.body;
  console.log(user);
  Author.create({ user })
    .then(author => {
      res.status(201).json(author);
      console.log(author);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Author.findByPk(id).then(author => {
    if (!author) {
      return res.sendStatus(404);
    }

    res.json(author);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Author.findByPk(id).then(author => {
    if (!author) {
      return res.sendStatus(404);
    }

    author.user = req.body.user;
    author
      .save()
      .then(author => {
        res.json(author);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Author.findByPk(id).then(author => {
    if (!author) {
      return res.sendStatus(404);
    }

    author.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
