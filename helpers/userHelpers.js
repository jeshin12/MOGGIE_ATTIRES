var db = require('../dbconfig/connection')
var collection = require('../dbconfig/collection')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { log } = require('console')
var objectId= require('mongodb'). ObjectId

module.exports={

   

    doSignup: (userData) => {
        console.log(userData,'userDataaaaaaaaa');
        return new Promise(async (resolve, reject) => {
            let userWithMobile = await db.get().collection(collection.USER_COLLECTION).find({ phone: userData.phone }).toArray();
            let userWithEmail = await db.get().collection(collection.USER_COLLECTION).find({ Email: userData.Email }).toArray();
            let rejectResponse = {};
    
            if (userWithEmail.length > 0) {
                console.log('kkkkkkkk');
                rejectResponse.emailExists = true;
                reject(rejectResponse);
            } else if (userWithMobile.length > 0) {
                console.log('llllllll');
                rejectResponse.mobileExists = true;
                reject(rejectResponse);
            } else {
               console.log('ividee vannu');
                userData.Password = await bcrypt.hash(userData.Password, 10);
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((userData) => {
                    resolve(userData)
                })
            }
        });
    },

    dologin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user) {
                console.log(userData.Password,'userDataaaaaaaaa');
                console.log(user.Password,'user.Passworddddd');
                
                    bcrypt.compare(userData.Password, user.Password).then((status) => {//user kodutha pssword data base lulla password check cheyyunnu 
                        console.log(status, 'st')
                        if (status) {
                            console.log("login success");
                            response.user = user
                            response.status = true
                            resolve(response)
                        } else {
                            reject({ error:"invalid password" })
                        }
                    })
                
            } else {
                console.log("no user");
                reject({ error:"invalid email" })
            }
        })
    },
    getUser: (userID) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userID) })
            if (user) {
                resolve(user)
            }
        })
    },

    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(user)
        })
    },
    totUsers: () => {
        return new Promise(async (resolve, reject) => {
            var totalUsers = await db.get().collection(collection.USER_COLLECTION).count();
            resolve(totalUsers)
        })
    },

    changeStatus: function (id) {
        return new Promise(async function (resolve, reject) {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(id) })
            if (user.blocked == true) {
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: objectId(id) }, {
                    $set: {
                        blocked: false
                    }
                }).then(() => {
                    resolve("unblocked")
                })
            } else {
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: objectId(id) }, {
                    $set: {
                        blocked: true
                    }
                }).then((response) => {
                    resolve("blocked")
                })
            }
        })
    },
}