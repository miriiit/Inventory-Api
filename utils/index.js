'use strict';
const config = require("../config");
const fs = require('fs');

      //dataSourcesPath:['raw-data/collections.json', 'raw-data/products.json']
     

const MockDataCollections = function (callback) {
const collectionsFilePath =  config.dataSourcesPath[0] || 'raw-data/collections.json';
console.log("File PAth  "+ collectionsFilePath );
     fs.readFile(collectionsFilePath, (err, data) => {
        if (err) throw callback(err);
        let collections = JSON.parse(data);
        console.log(collections);
        callback(null, collections);
    });    
};      
const MockDataProducts = function (callback) {
    const productsFilePath =  config.dataSourcesPath[1] || 'raw-data/products.json';
    console.log("File PAth  "+ productsFilePath );
    fs.readFile(productsFilePath, (err, data) => {    
    if (err) throw callback(err);
        let products = JSON.parse(data);
        console.log(products);
        callback(null, products);
    });
};



module.exports.mockDataCollections = MockDataCollections;
module.exports.mockDataProducts = MockDataProducts;
