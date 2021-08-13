const User = require("../model/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');

const userSignUp = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email }).select('-password');

        if (userExist) {

            req.session.user = userExist;

            res.status(409).json({
                status: 'failed',
                isSuccess: false,
                code: 409,
                message: 'User is already exist'
            });

        } else {

            let salt = await bcrypt.genSalt(10);

            let hashPass = await bcrypt.hash(password, salt);

            let newUser = new User({
                name,
                email,
                password: hashPass
            });

            await newUser.save();

            req.session.user = newUser;

            res.json({
                status: 'success',
                isSuccess: true,
                code: 200,
                message: 'User is created!'
            })
        }
    } catch (error) {

        console.log(error);

        res
            .status(500)
            .json({
                status: 'failed',
                isSuccess: false,
                code: 500,
                message: error.response ? error.response : error.message
            })
    }
})

const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    try {
        let signInUser = await User.findOne({ email });

        if (signInUser) {

            let isMatched = await bcrypt.compare(password, signInUser.password);

            if (isMatched) {
                let user = await User.findOne({ email }).select('-password')
                req.session.user = user;
                res.json({
                    status: 'success',
                    isSuccess: true,
                    code: 200,
                    message: 'User found',
                    data: {
                        user
                    }
                })
            } else {
                res
                    .status(404)
                    .json({
                        status: 'failed',
                        isSuccess: false,
                        code: 403,
                        message: 'Authentication failed'
                    })
            }
        } else {
            res
                .status(404)
                .json({
                    status: 'failed',
                    isSuccess: false,
                    code: 403,
                    message: 'User  not found'
                })
        }
    } catch (error) {

        console.log(error);

        res
            .status(500)
            .json({
                status: 'failed',
                isSuccess: false,
                code: 500,
                message: error.response ? error.response : error.message
            })
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    try {
        let userFound = await User.findById({ _id });

        if (userFound) {

            await User.findByIdAndDelete({ _id })

            res.json({
                status: 'success',
                isSuccess: true,
                code: 200,
                message: `User ${userFound.email} has been deleted`
            })
        } else {
            res
                .status(404)
                .json({
                    status: 'failed',
                    isSuccess: false,
                    code: 404,
                    message: `User id not found`
                })
        }
    } catch (error) {
        console.log(error);

        res
            .status(500)
            .json({
                status: 'failed',
                isSuccess: false,
                code: 500,
                message: error.response ? error.response : error.message
            })
    }
})

module.exports = {
    userSignUp, userLogin, deleteUser
}