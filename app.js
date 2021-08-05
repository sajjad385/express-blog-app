require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const config = require('config')
const chalk = require('chalk')


//set middleware
const setMiddleware = require('./middleware/middleware')
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
