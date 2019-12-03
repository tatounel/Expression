const express = require("express");
const router = express.Router();

// Load each controller
const artistsController = require("./Artist.js");
const authorsController = require("./Author.js");
const contentsController = require("./Content.js");
const genresController = require("./Genre.js");
const matchesController = require("./Match.js");
const portfoliosController = require("./Portfolio.js");
const stylesController = require("./Style.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/artists", artistsController);
router.use("/authors", authorsController);
router.use("/contents", contentsController);
router.use("/genres", genresController);
router.use("/matches", matchesController);
router.use("/portfolios", portfoliosController);
router.use("/styles", stylesController);

module.exports = router;
