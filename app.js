require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require("mongoose");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const config = require('config')

//Import Routes
const authRoutes = require('./routes/authRoutes')
const dashboardRoute = require('./routes/dashboardRoute')

//Import Middlewares

const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

//Playground Routes
const validatorRoutes = require('./playground/validator') //TODO: Should be remove

let dbHost = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ivbeu.mongodb.net/${process.env.DB_NAME}`
const store = new MongoDBStore({
    uri: dbHost,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
})

const app = express()

//Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')


/*if (app.get('env').toLowerCase() === 'development') {

    console.log(config.dev.name)
    app.use(morgan('dev'))

} else {
    console.log(config.prod.name)
}*/

console.log(config.get('name'))

//Middleware Array
const middleware = [

    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]
app.use(middleware)


app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoute)
app.use('/playground', validatorRoutes) //TODO: Should be remove
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my app'
    })
})
app.get('*', (req, res) => {
    res.send('<h1>404 !<br> Page Not Found</h1>')
})

//Server Connection
const PORT = process.env.PORT
mongoose.connect(`${dbHost}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log('Database Connect Successfully')
        console.log(`Server is running on PORT ${PORT}`)
    })
}).catch(e => {
    console.log(e)
})
