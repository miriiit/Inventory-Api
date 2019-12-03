
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





module.exports = {queryGetAllCollections, queryInsertCollection, queryUpdateCollection, queryGetAllProducts, queryInsertProduct, queryUpdateProduct };
