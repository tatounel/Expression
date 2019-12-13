const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { Match } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /matchs
//    POST   /matchs
//    GET    /matchs/:id
//    PUT    /matchs/:id
//    DELETE /matchs/:id

router.get("/", (req, res) => {
  Match.findAll({}).then(matchs => res.json(matchs));
});

router.post("/", (req, res) => {
  let data = req.body;

  Match.create(data)
    .then(match => {
      res.status(201).json(match);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Match.findByPk(id).then(match => {
    if (!match) {
      return res.sendStatus(404);
    }

    res.json(match);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Match.findByPk(id).then(match => {
    if (!match) {
      return res.sendStatus(404);
    }

    Object.keys(req.body).forEach(function(key) {
      console.log(key, req.body[key]);
      match[key] = req.body[key];
    });
    match
      .save()
      .then(match => {
        res.json(match);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Match.findByPk(id).then(match => {
    if (!match) {
      return res.sendStatus(404);
    }

    match.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
