export default {
   "$schema": "http://json-schema.org/draft-07/schema#",
   "$id": "http://example.com/product.schema.json",
   "title": "Product",
   "description": "A product from Acme's catalog",
   "type": "object",
   "properties": {
     "productId": {
       "description": "The unique identifier for a product",
       "type": "integer"
     },
     "productName": {
      "description": "Name of the product",
      "type": "string"
    },
    "productPrice": {
      "description": "Price of the product",
      "type": "number"
    },
    "producTags": {
      "description": "Array of product tags",
      "type": "array",
      "items": {
         "type" : "string";
      },
      "minItems" : 1,
      "uniqueItems" : true
    },
   },
   "required": [ "productId", "productName" ]
 }