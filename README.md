# Inventory-Api

## NPM Commands
- **npm i**
- **npm run dev**

## Express, Joi, Basic Authentication, Cors Enable Working Structure
## Description
It's an simple Update Api where Product is Category cover various collections. to update an product following actions may be there

1) change name
2) Add new Collection
3) Remove Collection
4) Update Collection Url, name etc.

## To Access Api use Basic Authentication { username: 'basic',  password: '#basic#'}
Authentication Header of url request

URI To Access Resources Are Listed Below

## Get All Collections
http:localhost:4001/inventory/collections

## Get All Products
http:localhost:4001/inventory/products

## Put Request To Update Product
localhost:4001/inventory/updateProduct

## Request Body
```javascript
{
		"id": "B32DED2B-0D77-4CD8-AD4A-04719A18F8F4",
		"product_name": "Lime Ridge Another",
		"product_collections": [{"id":"AF69D064-DDB6-4424-B8FC-E693C010E1BF", "name":"Ready To Wear For kids",
		"url":"ready-to-wear-sale","priority":1,"action":2}]				
}
```

- **action = 1 To Insert new Collection in product**
- **action = 2 To Update new Collection in product**
- **action = 3 To Remove new Collection from product**

##Traverse JSON LIST To Update Specific Product Collection


## Product Update
```javascript
{
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
					    //APiCall To Update in database 
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
}
```

@ Author Muhammad Azhar Hussnain 
@ Email miriiit60@gmail.com
