var db = require('../dbconfig/connection')
var collection = require('../dbconfig/collection')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { log } = require('console')
var objectId= require('mongodb'). ObjectId

module.exports={

    addProduct: (productData) => {
        console.log(productData,'productDataaaaaaaaaa');
        return new Promise(async (resolve, reject) => {
            productData.price = parseInt(productData.price)
            productData.stock = parseInt(productData.stock)
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(productData).then((data) => {
                resolve(data.insertedId)
            })
        })
    },
    getallProductPage: (pageNo) => {
        return new Promise(async (res, rej) => {
          let users = await db.get().collection(collection.PRODUCT_COLLECTION).aggregate([        
              {
                $skip: parseInt(pageNo),
              },
              {
                $limit:4,
              },
            ])
            .toArray();
          res(users);
        });
      },
      getAllProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
                resolve(products)

        })
      },

      getProductDetails: (productId) => {
        console.log(productId);
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: objectId(productId) })

            console.log(product);
            resolve(product)
        })
    },
}