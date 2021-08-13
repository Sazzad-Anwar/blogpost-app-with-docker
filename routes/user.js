const { userSignUp, userLogin, deleteUser } = require('../controller/authUser')
const router = require('express').Router()


//@Description: User signUp
//Route: /api/v1/user/signup
router
    .route('/signup')
    .post(userSignUp)

//@Description: User login
//Route: /api/v1/user/login
router
    .route('/login')
    .post(userLogin)

//@Description: User login
//Route: /api/v1/user/delete
router
    .route('/delete/:_id')
    .delete(deleteUser)


module.exports = router