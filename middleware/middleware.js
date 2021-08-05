const express = require("express");
const morgan = require('morgan')
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require("connect-flash");
const {bindUserWithRequest} = require("./authMiddleware");
const setLocals = require("./setLocals");

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ivbeu.mongodb.net/${process.env.DB_NAME}`
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
})
const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
]
module.exports = app=>{
    middlewares.forEach(middleware=>{
        app.use(middleware)
    })
}