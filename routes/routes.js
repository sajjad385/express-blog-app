const authRoutes = require("./authRoutes");
const dashboardRoute = require("./dashboardRoute");
const validatorRoutes = require('../playground/validator') //TODO: Should be remove
const routes = [
    {
        path: '/auth',
        handler: authRoutes
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/playground',
        handler: validatorRoutes //TODO: Should be remove
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: 'Welcome to my app'
            })
        }
    },
    {
        path: '*',
        handler: (req, res) => {
            res.send('<h1>404 !<br> Page Not Found</h1>')
        }
    }
]

module.exports = app => {
    routes.forEach(route => {
        app.use(route.path, route.handler)
    })
}