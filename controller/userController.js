const { log } = require("console")
const { response } = require('express');
const {doSignup,dologin} = require('../helpers/userHelpers') 
const{getAllProduct} = require('../helpers/productHelpers')

module.exports={

    //*********LOGIN**** */
    loginPage(req,res){
        if (req.session.loggedIn) {

           
            res.redirect('/')
        } else {

            console.log("calledddddddddddddddddddddd");
            res.render('users/login', { 'loginErr': req.session.loginErr })
            req.session.loginErr = false
        }
       
    },
    loginSubmit(req, res) {

        dologin(req.body).then((response) => {

            req.session.loggedIn = true;
            req.session.users = response.user;
            res.redirect('/')
        }).catch((error) => {
            console.log(error,'dfhdfdfdf');
            req.session.loginErr = true;
            res.render('users/login', { error: error.error })
        })
    },

    logOut(req, res) {

        req.session.loggedIn = null
        req.session.users = null
        res.redirect('/login')
    },
    //*********LOGIN END**** */


    //*****SIGNUP***** */
    signupPage(req,res){

        res.render('users/signUp',{ signupErr: req.flash('userExists') })
    },


    async signupSubmit(req, res) {

            doSignup(req.body).then((userData) => {

                console.log(userData,'jsdfhagsdfgihsdf');
                req.session.loggedIn = true;
                req.session.users = userData;
                res.render('users/login')
                // res.render('users/homePage', { user: true })
            }).catch((response) => {
                if (response.mobileExists) {
                    req.flash('userExists', 'This Mobile number is already registered with us!')
                    res.redirect('/signUp')
                }
                if (response.emailExists) {
                    req.flash('userExists', 'This Email is  already registered with us! !')
                    res.redirect('/signUp')
                }

            })

    },

    //*****SIGNUP END***** */

    homePage(req,res){
        let user = req.session.users
        if (req.session.users) {
            
                    // res.render('users/homePage', { user, logged: true, userData: user,  })
                    getAllProduct().then((products) => {
                        console.log(products,"productssssssss");
                        products.forEach(async (element) => {
                            if (element.stock <= 10 && element.stock != 0) {
                                element.fewStock = true;
                            } else if (element.stock == 0) {
                                element.noStock = true;
                            }
                        });
                        // console.log(category);
                        // res.render('user/main', { user: true, category, products, users: true,wishCount, person, cartCount });
                        res.render('users/homePage', { user, logged: true, userData: user,products  })
                    });
           
        }
       

       
    },

    wrongGet: async (req, res) => {
        res.render('users/wrong')
    },


}