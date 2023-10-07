var express = require('express');
var router = express.Router();

const{loginPage,signupPage,homePage,signupSubmit,loginSubmit,logOut,wrongGet}=require('../controller/userController')

const{sessionCheck,nocache,verifyLogin}=require('../middleware/user-middleware')

/* GET users listing. */
router.get('/',sessionCheck,homePage);

/* ********** loginpage ****** */

router.get('/login',loginPage)

router.post('/loginSubmit',loginSubmit)

router.get('/logout',logOut)

//*********signup******* */

router.get('/signUp',signupPage)

router.post('/signupSubmit',signupSubmit)


router.get('/wrong', wrongGet);
module.exports = router;
