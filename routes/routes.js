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
    }
]

module.exports = app => {
    routes.forEach(route => {
        if (route.path === '/') {
            app.get(route.path, route.handler)
        } else {
            app.use(route.path, route.handler)
        }
    })
}