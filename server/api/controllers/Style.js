const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { Style } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /styles
//    POST   /styles
//    GET    /styles/:id
//    PUT    /styles/:id
//    DELETE /styles/:id

router.get("/", (req, res) => {
  Style.findAll({}).then(styles => res.json(styles));
});

router.post("/", (req, res) => {
  let { content } = req.body;

  Style.create({ content })
    .then(style => {
      res.status(201).json(style);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Style.findByPk(id).then(style => {
    if (!style) {
      return res.sendStatus(404);
    }

    res.json(style);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Style.findByPk(id).then(style => {
    if (!style) {
      return res.sendStatus(404);
    }

    style.content = req.body.content;
    style
      .save()
      .then(style => {
        res.json(style);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Style.findByPk(id).then(style => {
    if (!style) {
      return res.sendStatus(404);
    }

    style.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
