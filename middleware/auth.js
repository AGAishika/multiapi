const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    console.log('hello security guard or middleware');
    // here we are taking the token which we get in login page 
    // to check the token we need a package i.e. cookie-parser
    const {token} = req.cookies
    // console.log(token);

    if(!token){
        req.flash('error', 'unauthorized login')
        res.redirect('/login');
    }else{
        const data = jwt.verify('token','ishika12345678agarwal')
        // console.log(data)
        req.data1= data;
        next();
    }
}
module.exports = checkAuth;