const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { Genre } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /genres
//    POST   /genres
//    GET    /genres/:id
//    PUT    /genres/:id
//    DELETE /genres/:id

router.get("/", (req, res) => {
  Genre.findAll({}).then(genres => res.json(genres));
});

router.post("/", (req, res) => {
  let { content } = req.body;

  Genre.create({ content })
    .then(genre => {
      res.status(201).json(genre);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Genre.findByPk(id).then(genre => {
    if (!genre) {
      return res.sendStatus(404);
    }

    res.json(genre);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Genre.findByPk(id).then(genre => {
    if (!genre) {
      return res.sendStatus(404);
    }

    genre.content = req.body.content;
    genre
      .save()
      .then(genre => {
        res.json(genre);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Genre.findByPk(id).then(genre => {
    if (!genre) {
      return res.sendStatus(404);
    }

    genre.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
