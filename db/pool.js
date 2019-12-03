
const {dbOpts} = require('../middlewares/options.js');
const oracledb = require('oracledb');
var poolGbl;
const createDbPool = function (cb) {
    if(poolGbl == undefined){
    oracledb.createPool(dbOpts, async function (err, pool) {
        if (err) {
        console.log("ERROR: ", new Date(), ": createPool() callback: " + err.message);
        return cb(err);
        }
        poolGbl= pool;
        return cb(null, pool);
    });
    }else {
        cb(null, poolGbl);
    }
};

module.exports = { createDbPool };