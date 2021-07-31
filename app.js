const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome My Blog App!'
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})