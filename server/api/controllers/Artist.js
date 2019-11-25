const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { Artist } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /artists
//    POST   /artists
//    GET    /artists/:id
//    PUT    /artists/:id
//    DELETE /artists/:id

router.get("/", (req, res) => {
  Artist.findAll({}).then(artists => res.json(artists));
});

router.post("/", (req, res) => {
  let { content } = req.body;

  Artist.create({ content })
    .then(artist => {
      res.status(201).json(artist);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      return res.sendStatus(404);
    }

    res.json(artist);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      return res.sendStatus(404);
    }

    artist.content = req.body.content;
    artist
      .save()
      .then(artist => {
        res.json(artist);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      return res.sendStatus(404);
    }

    artist.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
