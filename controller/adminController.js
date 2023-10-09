const { log } = require("console")
const { response } = require('express');
const{doadminLoged} = require('../helpers/adminHelpers');
const{getAllUsers,totUsers,changeStatus} = require('../helpers/userHelpers')


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


    listProductGet(req,res){
        try{
            res.render('admin/list-product',{admin:true})
        } catch (error) {
            console.log('somthing wrong in  adminDashboardGet');
            res.redirect('/wrong')
        }
       
    },

    addProductGet: async (req, res) => {
        // let category = await categoryHelpers.get_category_list()
        res.render('admin/add-product', { admin: true })
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