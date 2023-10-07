const { log } = require("console")
const { response } = require('express');
const{doadminLoged} = require('../helpers/adminHelpers');
const{getAllUsers,totUsers,changeStatus} = require('../helpers/userHelpers')


module.exports={



     /* ********** Dashbord ****** */

     adminDashbord:async(req,res)=>{

        let Users = await totUsers()
        res.render('admin/admin-dashboard',{admin:true,Users})
    },

    /* ********** dashboard end****** */



     /* ********** LOGIN ADMIN  ****** */
    adminLogin(req,res){
        res.render('admin/admin-login')
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



     /* ********** LIST PRODUCT  ****** */


    listProductGet(req,res){
        res.render('admin/list-product',{admin:true})
    },

     /* ********** LIST PRODUCT END ****** */

    

   

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

    /* ********** userPage end****** */



    listCategoryGet(req,res){
        res.render('admin/list-category',{admin:true})
    },

    listOrderGet(req,res){
        res.render('admin/list-order',{admin:true})
    },

    listCouponGet(req,res){
        res.render('admin/list-coupon',{admin:true})
    }


}