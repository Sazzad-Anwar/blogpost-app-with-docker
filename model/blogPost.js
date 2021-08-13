const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Post title can not be null']
    },
    searchTitle: {
        type: String,
        required: [true, 'Search title can not be null']
    },
    post: {
        type: String,
        required: [true, 'Blog post can not be null']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);