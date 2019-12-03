const express = require("express");
const router = express.Router();
const rateLimit = require('express-request-limit');
const cors = require('cors');

var {corsOptionsDelegate, rateLimitOpts } = require('../middlewares/options.js');

const indexController = require ('../controllers/indexController')
router.get("/",cors(corsOptionsDelegate),
                   //rateLimit(rateLimitOpts),
                    indexController.index);

module.exports = router;