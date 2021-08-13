const Post = require('../model/blogPost');
const asyncHandler = require('express-async-handler');

const createBlogPost = asyncHandler(async (req, res) => {
    const { post, title } = req.body;

    let { user } = req.session;

    try {

        let newPost = new Post({
            post, user: user._id, title, searchTitle: title.split(' ').join('-').toLowerCase()
        })

        await newPost.save();

        res.json({
            status: 'success',
            isSuccess: true,
            code: 200,
            message: 'User found',
            data: {
                post: newPost
            }
        })
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

const updatePost = asyncHandler(async (req, res) => {

    const { _id } = req.params;

    try {
        await Post.findOneAndUpdate({ _id }, {
            $set: {
                post: post
            }
        });

        res.json({
            status: 'success',
            isSuccess: true,
            code: 200,
            message: "Post Updated"
        })

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

const getBlogPost = asyncHandler(async (req, res) => {
    try {

        const { searchBlog } = req.params;

        if (searchBlog && searchBlog.includes(' ')) {

            let title = searchBlog.split(' ').join('-').toLowerCase()

            let post = await Post.findOne({ searchTitle: title });

            if (post) {

                res.json({
                    status: 'success',
                    isSuccess: true,
                    code: 200,
                    data: {
                        post
                    }
                })

            } else {

                res
                    .status(404)
                    .json({
                        status: 'failed',
                        isSuccess: false,
                        code: 404,
                        message: "Post not found"
                    })
            }

        } else if (searchBlog && !searchBlog.includes(' ')) {
            let post = await Post.findOne({ _id: searchBlog });

            if (post) {

                res.json({
                    status: 'success',
                    isSuccess: true,
                    code: 200,
                    data: {
                        post
                    }
                })
            } else {

                res
                    .status(404)
                    .json({
                        status: 'failed',
                        isSuccess: false,
                        code: 404,
                        message: "Post not found"
                    })

            }
        } else {

            let post = await Post.find();

            if (post) {

                res.json({
                    status: 'success',
                    isSuccess: true,
                    code: 200,
                    data: {
                        post
                    }
                })
            } else {

                res
                    .status(404)
                    .json({
                        status: 'failed',
                        isSuccess: false,
                        code: 404,
                        message: "Posts not found"
                    })

            }

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

const postDelete = asyncHandler(async (req, res) => {
    try {

        const { _id } = req.params;

        await Post.deleteOne({ _id })

        res.json({
            status: 'success',
            isSuccess: true,
            code: 200,
            message: 'Post deleted'
        })

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
    createBlogPost,
    updatePost,
    getBlogPost,
    postDelete
}