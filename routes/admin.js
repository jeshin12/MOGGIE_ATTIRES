var express = require('express');
var router = express.Router();

const {adminLogin,adminloginsubmit,listProductGet,adminDashbord,listUserGet,listCategoryGet,listOrderGet,
        listCouponGet,changeStatusGet} = require('../controller/adminController')
// router.get('/', function(req, res, next) {
//   res.render('admin/admin-login');
// });
  

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


router.get('/list-product/:id',listProductGet);


router.get('/list-category',listCategoryGet)

router.get('/list-order',listOrderGet)

router.get('/list-coupon',listCouponGet)
  module.exports = router;