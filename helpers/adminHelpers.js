var db = require('../dbconfig/connection')
var collection = require('../dbconfig/collection')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { log } = require('console')
var objectId= require('mongodb'). ObjectId

module.exports={

    doadminLoged: (adminData) => {
       
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ Email: adminData.Email })
            
            if (admin) {
               
                bcrypt.compare(adminData.Password, admin.Password).then((status) => {
                    console.log(status,'statussssssss');
                    if (status) {
                        response.admin = admin
                        response.status = true
                        resolve(response);
                    } else {
                        console.log('Login failedddddd');
                        reject({ status: false })
                    }
                })
            }
            else {
                console.log('Login failed');
                reject({ status: false })
            }
        })
    }
}