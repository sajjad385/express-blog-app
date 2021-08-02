const express = require('express')
const morgan = require('morgan')
const mongoose = require("mongoose");

//Import Routes
const authRoutes = require('./routes/authRoutes')

//Playground Routes
const validatorRoutes = require('./playground/validator') //TODO: Should be remove


const app = express()

//Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]
app.use(middleware)


app.use('/auth', authRoutes)
app.use('/playground',validatorRoutes) //TODO: Should be remove
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my app'
    })
})
app.get('*', (req, res) => {
    res.send('<h1>404 !<br> Page Not Found</h1>')
})





//Server Connection
let dbHost = 'mongodb+srv://testadmin:testadmin@cluster0.ivbeu.mongodb.net/express-blog?retryWrites=true&w=majority'
const PORT = process.env.PORT || 4141
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
