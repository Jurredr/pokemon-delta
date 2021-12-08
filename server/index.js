import Server from './Server'
import dotenv from 'dotenv'

// Configure dotenv
dotenv.config()

// Initialize the server
new Server(process.env.PORT || 81)
