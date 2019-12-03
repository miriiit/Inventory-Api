/* const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter'); */

//const  feed  =require('../models/feed');

const Joi = require('joi'); 
const dbQueries = require('../db/queries');

const Product = require('../models/Product');
const Collection = require('../models/Collection');

const EnumCollectionAction = require('../models/enumCollectionAction');


exports.index = (req, res) =>{
    res.send({ title: 'Index',response:true ,data:  "Get All Products"}).status(200);
    //res.redirect('/inventory');
};

exports.GetAllProducts= async (req, res, next) =>{
    await dbQueries.queryGetAllProducts( (err, result) =>{
        if(err) {
          console.log("DB Info Error Fetching! "+err);
          res.send(err).status(404);
          return;
         }
        if (result) { // No results.
            res.send({ title: 'GetAllProducts',response:true ,size : result.length , data:  result}).status(200);
        }
    });
};

exports.InsertProduct = async (req, res, next) =>{
    // await dbQueries.queryKse100( (err, result) =>{
    //     if(err) {
    //       console.log("DB Info Error Fetching! "+err);
    //       res.send(err).status(404);
    //       return;
    //      }

    //     if (result) { // No results.
    //         res.send({ title: 'KSE100',response:true ,size : result.length , data:  result}).status(200);
    //     }
    //     else { // No results.
    //         var err = new Error('No KSE100 Feed Found!');
    //         err.status = 404;
    //         res.send(err).status(404);
    //     }
    // });
    res.send({ title: 'InsertProduct',response:true , data:  "Insert Product"}).status(200);
};

exports.UpdateProduct = async (req, res, next) => {


    const schema = Joi.object({
        id: Joi.required(),
        //product_name: Joi.string().required(),
        product_collections: Joi.array().items(Joi.object({
            id: Joi.string().required(),
            //name: Joi.string().required(),
            action: Joi.number().min(1),
            //url: Joi.string(),
           // priority: Joi.number()
        }).options({ allowUnknown: true }))
    }).options({ allowUnknown: true });

    const { body } = req;
    const result = Joi.validate(body, schema);

    /*
    id,
    name,
    collection = {id, name, isRemove, isUpdate, isNew}
    req. body = name, [{collection}]
    */

    const { value, error } = result;
    const valid = error ==null;
    if (!valid) {
        res.status(422).json({
            message: 'Invalid request',
            data: body
        })
    } else {

        await dbQueries.queryGetAllProducts((err, result) => {
            if (err) {
                console.log("DB Info Error Fetching! " + err);
                res.send(err).status(404);
                return;
            }
            if (result) { // No results.

                try{
                let productId = body.id;
                if(productId)
                {
                    //Get product from json file stored
                    let savedProduct = result.find(item => item.id==productId);
                    if(savedProduct){
                        //Try to Change Category Name --Product name
                        let productName = body.prduct_name;
                        if(productName){
                            savedProduct.name = productName;
                        }
                        //Saved Collection of Product
                        var productCollection = savedProduct.product_collections;
                        //Recived Collection of Product
                        //Validiate using joi
                        let recievedCollections = body.product_collections;
                        //Iterate over recive collection
                        recievedCollections.forEach(element => {
                            let action = element.action;
                            switch (action) {
                                case EnumCollectionAction.ISNEW:
                                        element.id = rand()*1000;
                                        productCollection.push(element);
                                    break;  
                                case EnumCollectionAction.ISUPDATE:       
     
                                for (let key in productCollection) {
                                    key = parseInt(key);
                                   for(let key1 in productCollection[key]){
                                    if(key1 == element.id){
                                        let collection = productCollection[key][key1];   
                                            if(collection){
                                                let name = element.name;
                                                if(name)
                                                collection.name = element.name;
                                               
                                                let priority  = element.priority;
                                                if(priority){
                                                    collection.priority = priority;
                                                }
        
                                                let url  = element.url;
                                                if(url){
                                                    collection.url = url;
                                                }
                                                // Automatically savedProduct be updated by refernce
                                            }
                                            res.send({ title: 'Product Updated', response: true, size: savedProduct.length, data: savedProduct }).status(200);
                                        }
                                        }
                                      }
                                      res.end({ title: 'Product Updated', response: true, message:'product update complete' }).status(200);
                                    // api to update collection
                                    break;
                                    case EnumCollectionAction.ISREMOVE:
                                        //element recive collection is removed now from product collection
                                        productCollection.filter(item => item.id != element.id);  
                                    break;
                            }
                        });
                      
                    }
                }
               
            }catch(ex){
                res.status(404).send({ title: 'Exception',message:ex,response:true, data:  ""});
            }
            }
       
        });
       // res.json({ message: 'Resource created', data: "" })
    }



   // res.send({ title: 'UpdateProduct',response:true, data:  "Update Product"}).status(200);
};

exports.GetAllCollections= async (req, res, next) =>{
    await dbQueries.queryGetAllCollections( (err, result) =>{
        if(err) {
          console.log("DB Info Error Fetching! "+err);
          res.send(err).status(404);
          return;
         }
        
        if (result) { // No results.
            res.send({ title: 'KSE100',response:true ,size : result.length , data:  result}).status(200);
        }
    });
};

exports.InsertCollection= async (req, res, next) =>{
    res.send({ title: 'InsertCollection',response:true , data:  "Insert Collection"}).status(200);
};

exports.UpdateCollection= async (req, res, next) =>{
    res.send({ title: 'UpdateCollection',response:true , data:  "Update Collection"}).status(200);
};
