const authRoutes = require("./authRoutes");
const dashboardRoute = require("./dashboardRoute");
const postRoutes = require("./postRoutes");
const uploadRoutes = require("./uploadRoutes");
const playGround = require('../playground/play') //TODO: Should be remove
const apiRoutes = require("./apiRoutes");
const exploreRoutes = require("./exploreRoutes");
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
        path: '/posts',
        handler: postRoutes
    },
    {
        path: '/uploads',
        handler: uploadRoutes
    },
    {
        path: '/api',
        handler: apiRoutes
    },
    {
        path: '/explore',
        handler: exploreRoutes
    },
    {
        path: '/playground',
        handler: playGround //TODO: Should be remove
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