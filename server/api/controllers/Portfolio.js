const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { Portfolio } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /portfolios
//    POST   /portfolios
//    GET    /portfolios/:id
//    PUT    /portfolios/:id
//    DELETE /portfolios/:id

router.get("/", (req, res) => {
  Portfolio.findAll({}).then(portfolios => res.json(portfolios));
});

router.post("/", (req, res) => {
  let data = req.body;

  Portfolio.create(data)
    .then(portfolio => {
      res.status(201).json(portfolio);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Portfolio.findByPk(id).then(portfolio => {
    if (!portfolio) {
      return res.sendStatus(404);
    }

    res.json(portfolio);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Portfolio.findByPk(id).then(portfolio => {
    if (!portfolio) {
      return res.sendStatus(404);
    }

    Object.keys(req.body).forEach(function(key) {
      console.log(key, req.body[key]);
      portfolio[key] = req.body[key];
    });
    portfolio
      .save()
      .then(portfolio => {
        res.json(portfolio);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Portfolio.findByPk(id).then(portfolio => {
    if (!portfolio) {
      return res.sendStatus(404);
    }

    portfolio.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
