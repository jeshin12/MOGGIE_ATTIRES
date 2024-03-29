const { getUser } = require('../helpers/userHelpers')
// var productHelpers = require("../helpers/product-helpers");


module.exports = {
    sessionCheck: (req, res, next) => {

        if (req.session.users) {
            getUser(req.session.users._id).then((user) => {
                if (user.blocked) {
                    req.session.loggedIn = false
                    req.session.users = null
                    res.redirect('/login');

                } else {
                    next()
                }

            })

        } else{
            res.redirect('/login');
        }
        
    },

    verifyLogin(req, res, next) {
        if (req.session.loggedIn) {
            
            next()
        } else {
           
            res.redirect('/login')
           
            
        }
    },

  

    nocache: (req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-3');
        res.header('Pragma', 'no-cache');
        next();
    }

}