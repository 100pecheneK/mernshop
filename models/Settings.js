const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SettingsSchema = new Schema({
    shotTitle: {
        type: String,
    },
    title: {
        type: String,
    },
    image1: {
        type: String,
    },
    image1_text: {
        type: String,
    },
    advantages: {
        advantage1: {
            type: String
        },
        icon1: {
            type: String
        },
        advantage1_text:{
            type: String
        },
        advantage2: {
            type: String
        },
        icon2: {
            type: String
        },
        advantage2_text:{
            type: String
        },
        advantage3: {
            type: String
        },
        icon3: {
            type: String
        },
        advantage3_text:{
            type: String
        },
    },
    image2: {
        type: String,
    },
    image2_text: {
        type: String,
    },
    contactUs: {
        type: String,
    },
    contactUs_text: {
        type: String,
    },
    image3: {
        type: String,
    },
    image3_text: {
        type: String,
    },
    about: {
        type: String
    },
    links: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        vkontakte: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Settings = mongoose.model('settings', SettingsSchema)