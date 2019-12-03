
const oracledb = require('oracledb');
const db = require('../connect/oracledb.js');

const util = require('../../utils')

//Get All Collections
const queryGetAllCollections = async function (cb) {
    queryRes = await util.mockDataCollections(async (err, result) => {
        if (err) throw err;
        cb(null, result);
    });
};
//insert category item
const queryInsertCollection = async function (cb) {
    queryRes = await util.mockDataCollections(async (err, result) => {
        if (err) throw err;
        cb(null, result);
    });
};
//update category item 
const queryUpdateCollection = async function (cb) {
    queryRes = await util.mockDataCollections(async (err, result) => {
        if (err) throw err;
        cb(null, result);
    });
};
//Get All Products
const queryGetAllProducts = async function (cb) {
    queryRes = await util.mockDataProducts(async (err, result) => {
        if (err) throw err;
        cb(null, result);
    });
};
//insert new category
const queryInsertProduct = async function (cb) {
    queryRes = await util.mockDataCollections(async (err, result) => {
        if (err) throw err;
        cb(null, result);
    });
};
// update category
const queryUpdateProduct = async function (cb) {
    queryRes = await util.mockDataProducts(async (err, result) => {
        if (err) throw err;
        cb(null, result);
    });
};



/*
const queryDbInfo = async function (cb) {
    let sql = "SELECT SYS_CONTEXT('userenv', 'sid') AS session_id FROM DUAL";
    // Else everything looks good
    // Obtain the Oracle Session ID, then return the connection
    await db.doConnect(async (err, connection) => {
        if (err) {
            cb(err);
        } else {
            await db.doExecute(connection, sql, {}, async function (err, result) {
                // Something went wrong, releae the connection and return the error
                if (err) {
                    console.log("ERROR: Unable to determine Oracle SESSION ID for this transaction: ", err);
                    await releaseConnection(connection);
                    cb(err);
                }
                // Log the connection ID (we do this to ensure the conncetions are being pooled correctly)
                //console.log("INFO: Connection retrieved from the database, SESSION ID: ", result.rows[0]['SESSION_ID']);
                cb(err, result.rows);
            });
        }
    });
};

const querySystem = async function (cb) {
    let sql = "select * from SYSTEM";
    let queryRes = { err: null, res: null };
    queryRes = await db.doConnect(async (err, connection) => {
        if (err) {
            if (db)
                await db.doRelease(connection);
            cb(err);
        } else {
            await db.doExecute(connection, sql, {}, async function (err, result) {
                if (err) {
                    if (db)
                        db.doRelease(connection);     // RELEASE CONNECTION
                    cb(err);             // ERROR
                } else {
                    if (db)
                        db.doRelease(connection);     // RELEASE CONNECTION
                    console.log(result.rows);
                    cb(err, result.rows);
                }
            });
        }
    });
};
*/


module.exports = {queryGetAllCollections, queryInsertCollection, queryUpdateCollection, queryGetAllProducts, queryInsertProduct, queryUpdateProduct };