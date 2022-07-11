const {index} = require("../app/controllers/exploreController");

const exploreRoutes = require('express').Router()

exploreRoutes.get('/', index)

module.exports = exploreRoutes