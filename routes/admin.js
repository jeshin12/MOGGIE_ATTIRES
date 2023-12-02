var express = require('express');
var router = express.Router();

const {adminLogin,adminloginsubmit,listProductGet,adminDashbord,listUserGet,listCategoryGet,listOrderGet,
        listCouponGet,changeStatusGet,addProductGet,addProductPost,editProductGet} = require('../controller/adminController')

  

/* ********** loginpage ****** */
router.get('/',adminLogin);

router.post('/adminloginsubmit',adminloginsubmit)
/* ********** loginpage end****** */



/* ********** dashboard ****** */

router.get('/admin-dashbord',adminDashbord)

/* ********** dashboard end ****** */



/* ********** userPage ****** */

router.get('/list-user',listUserGet)

router.get('/changestatus',changeStatusGet);



/* ********** userPage end ****** */




/* ********** PRODUCT ****** */

router.get('/list-product/:id',listProductGet);

router.get('/add-product',addProductGet)

router.post('/add-product',addProductPost);

router.get('/edit-product/:id',editProductGet);



/* ********** PRODUCT PAGE END ****** */


router.get('/list-category',listCategoryGet)

router.get('/list-order',listOrderGet)

router.get('/list-coupon',listCouponGet)
  module.exports = router;