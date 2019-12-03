const express = require("express");
const router = express.Router();

const rateLimit = require('express-request-limit');


var inventoryController = require('../controllers/inventoryController');

var { corsOptionsDelegate, rateLimitOpts } = require('../middlewares/options.js');
const cors = require('cors');

router.get('/', cors(corsOptionsDelegate),
    //rateLimit(rateLimitOpts),
    inventoryController.index);
    
    
router.get('/collections', cors(corsOptionsDelegate),
//rateLimit(rateLimitOpts),
inventoryController.GetAllCollections);

router.get('/insertCollection', cors(corsOptionsDelegate),
//rateLimit(rateLimitOpts),
inventoryController.InsertCollection);

router.get('/updateCollection', cors(corsOptionsDelegate),
//rateLimit(rateLimitOpts),
inventoryController.UpdateCollection);



router.get('/products', cors(corsOptionsDelegate),
    //rateLimit(rateLimitOpts),
    inventoryController.GetAllProducts)

router.post('/insertProduct', cors(corsOptionsDelegate),
    //rateLimit(rateLimitOpts),
    inventoryController.InsertProduct);

router.put('/updateProduct', cors(corsOptionsDelegate),
    //rateLimit(rateLimitOpts),
    inventoryController.UpdateProduct);



module.exports = router;