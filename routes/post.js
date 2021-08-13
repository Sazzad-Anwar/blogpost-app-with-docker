const router = require('express').Router()
const { createBlogPost, getBlogPost, updatePost, postDelete } = require('../controller/post');
const protectRoute = require('../middleWares/authMIddleware');


//@Description: Post Create
//Route: /api/v1/posts/create
router
    .route('/create')
    .post(protectRoute, createBlogPost)

//@Description: Get all blogPost
//Route: /api/v1/posts
router
    .route('/')
    .get(getBlogPost)

//@Description: Get a blogPost
//Route: /api/v1/posts/:searchBlogPost
router
    .route('/:searchBlog')
    .get(getBlogPost)

//@Description: Update a blogPost
//Route: /api/v1/posts/:_id
router
    .route('/:_id')
    .put(protectRoute, updatePost)

//@Description: Delete a blogPost
//Route: /api/v1/posts/:searchBlogPost
router
    .route('/:_id')
    .delete(protectRoute, postDelete)

module.exports = router;