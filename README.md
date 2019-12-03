# Inventory-Api

## NPM Commands
- **npm i**
- **npm run dev**

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
