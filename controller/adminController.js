const { log } = require("console")
const { response } = require('express');
const{doadminLoged} = require('../helpers/adminHelpers');
const{getAllUsers,totUsers,changeStatus} = require('../helpers/userHelpers')
const{addProduct,getallProductPage,getProductDetails} = require('../helpers/productHelpers')


module.exports={



/* ********** Dashbord ****** */

     adminDashbord:async(req,res)=>{
        try{
            let Users = await totUsers()
            res.render('admin/admin-dashboard',{admin:true,Users})
        } catch (error) {
            console.log('somthing wrong in  adminDashboardGet');
            res.redirect('/wrong')
        }
       
    },

    /* ********** dashboard end****** */



/* ********** LOGIN ADMIN  ****** */
    adminLogin(req,res){
        try{
            res.render('admin/admin-login')
        } catch (error) {
            console.log('somthing wrong in  adminDashboardGet');
            res.redirect('/wrong')
        }
       
    },
    
    adminloginsubmit(req,res){
        
        doadminLoged(req.body).then((response) => {
            req.session.adminloggedIn = true;
            req.session.admin= response;
            res.redirect('/admin/admin-dashbord')
    
      }).catch((error) => {
        console.log(error);
       
    res.render('admin/admin-login', {error: 'Invalid login details' })
     }) 
    },
/* ********** LOGIN ADMIN END   ****** */



/* **********  PRODUCT  ****** */


  
    listProductGet: (req, res) => {
        try {
            let pageNo = (Number(req.params.id) - 1) * 4;
            let passNo = req.params.id;
            getallProductPage(pageNo).then((products)=>{
                res.render('admin/list-product', { admin: true, products,passNo })

            })
            // productHelpers.getAllProduct().then((products) => {
            // })
        } catch (error) {
            res.redirect('/wrong')

        }
    },

    addProductGet: async (req, res) => {
        // let category = await categoryHelpers.get_category_list()
        res.render('admin/add-product', { admin: true })
    },
    

    addProductPost: function (req, res) {
        console.log(req.body.Name,"dbaihsfvihbasfihvbhdibf");
        try {
            const prdtDetails = {
                Name: req.body.Name,
                price: req.body.price,
                discriptions: req.body.discriptions,
                stock: req.body.stock,
                // category: req.body.category,
                image1: req.files.image1.name,
                image2: req.files.image2.name,
                image3: req.files.image3.name,
                image4: req.files.image4.name
            }
            console.log(prdtDetails,'prdtDetailssssssssss');
            addProduct(prdtDetails).then((data) => {
                console.log(data,'dataaaaaaaaaaaaaaaaaaaa');
                let image1 = req.files.image1
                let image2 = req.files.image2
                let image3 = req.files.image3
                let image4 = req.files.image4

                image1.mv(`./public/assets/product-images/${data}.jpg`, (err, done) => {   // id pass cheythond athe productnde image ne kittan vendi data pass acejythu
                })
                image2.mv(`./public/assets/product-images/${data}2.jpg`, (err, done) => {
                })
                image3.mv(`./public/assets/product-images/${data}3.jpg`, (err, done) => {
                })
                image4.mv(`./public/assets/product-images/${data}4.jpg`, (err, done) => {
                })
                res.redirect('/admin/list-product/1')
            })
        } catch (error) {
            console.log(error,'somthing wrong in addProductPost ');
            res.redirect('/wrong')
        }
    },


    editProductGet: async (req, res) => {
        // try {
            let product = await getProductDetails(req.params.id)
            // let category = await categoryHelpers.get_category_list()
            res.render('admin/edit-product', { product, admin: true })
        // } catch (error) {
        //     res.redirect('/wrong') 
        // }
    },

 /* **********  PRODUCT END ****** */

    

   

/* ********** userPage ****** */

    listUserGet(req,res){
        try {
            getAllUsers().then((users) => {
                res.render('admin/list-user', { admin: true, users })
            })
        } catch (error) {
            res.redirect('/wrong')
        }
        
    },
     /* * user BLOCK,UNBLOCK */
    changeStatusGet: (req, res) => {
        try {
            changeStatus(req.query.id).then((response) => {
                admin__msg = response
                res.redirect('/admin/list-user')
            })
        } catch (error) {
            res.redirect('/wrong') 
        }
    },
     /* * user BLOCK,UNBLOCK end */


/* ********** userPage end****** */



    listCategoryGet(req,res){
        try{
            res.render('admin/list-category',{admin:true})
        } catch (error) {
            console.log('somthing wrong in  adminDashboardGet');
            res.redirect('/wrong')
        }
        
    },

    listOrderGet(req,res){
        try{
        res.render('admin/list-order',{admin:true})
        }catch (error) {
            console.log('somthing wrong in  adminDashboardGet');
            res.redirect('/wrong')
        }
    },

    listCouponGet(req,res){
        try{
        res.render('admin/list-coupon',{admin:true})
        }catch (error) {
            console.log('somthing wrong in  adminDashboardGet');
            res.redirect('/wrong')
        }
    }


}