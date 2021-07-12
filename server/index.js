// Import express
import express from 'express'

// Import mongoose
import mongoose from 'mongoose'

// Configure dotenv
require('dotenv').config()

// Create express instance
const app = express()

// Parse application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Start standalone server if directly running
if (require.main === module) {
    const port = process.env.PORT || 3001
    app.use(express.static('dist/public'))
    app.listen(port, () => {
        console.log(`Delta server listening on port ${port}`)
    })
}

// Export the express app
module.exports = app
