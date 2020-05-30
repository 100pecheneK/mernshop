const chalk = require('chalk')
const express = require('express')
const connectDB = require('./config/db')

// Create Server
const app = express()

// Connect to DataBase
connectDB()

// Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/api/admin/auth', require('./routes/api/auth'))
app.use('/api/admin/users', require('./routes/api/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(chalk.magenta(`Server started on port ${PORT}`)))
