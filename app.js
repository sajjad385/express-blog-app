require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const config = require('config')
const chalk = require('chalk')


//set middleware
const setMiddleware = require('./app/middleware/middleware')
//set Route
const setRoutes = require('./routes/routes')

//setting up app
const app = express()

//Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//Using Middleware from Middleware Directory
setMiddleware(app)
//Using routes from routes directory
setRoutes(app)

app.use((req, res, next) => {
    let error = new Error('404 page not found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.render('pages/errors/404', {
            title: '404 Not Found',
            flashMessage: {}
        })
    }
    console.log(chalk.redBright(error.message))
    return res.render('pages/errors/500', {
        title: 'Internal Server Error',
        flashMessage: {}
    })
})

//Server Connection
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ivbeu.mongodb.net/${process.env.DB_NAME}`

const PORT = process.env.PORT

mongoose.connect(`${MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(chalk.bgGreen('Database Connect Successfully'))
        console.log(chalk.greenBright.italic(`Server is running on PORT ${PORT}`))
    })
}).catch(e => {
    console.log(chalk.bgRed(e))
})
