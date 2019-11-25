const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { Content } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /contents
//    POST   /contents
//    GET    /contents/:id
//    PUT    /contents/:id
//    DELETE /contents/:id

router.get("/", (req, res) => {
  Content.findAll({}).then(contents => res.json(contents));
});

router.post("/", (req, res) => {
  const content = req.body;

  Content.create(content)
    .then(content => {
      res.status(201).json(content);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Content.findByPk(id).then(content => {
    if (!content) {
      return res.sendStatus(404);
    }

    res.json(content);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Content.findByPk(id).then(content => {
    if (!content) {
      return res.sendStatus(404);
    }

    Object.keys(req.body).forEach(function(key) {
      console.log(key, req.body[key]);
      content[key] = req.body[key];
    });
    content
      .save()
      .then(content => {
        res.json(content);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Content.findByPk(id).then(content => {
    if (!content) {
      return res.sendStatus(404);
    }

    content.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
