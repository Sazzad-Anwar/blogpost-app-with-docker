const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name can not be null']
    },
    email: {
        type: String,
        required: [true, 'Email can not be null'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password can not be null']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);