const chalk = require('chalk')
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
// Create Server
const app = express()

// Connect to DataBase
connectDB()
// Init Middleware
app.use(express.json({ extended: false }))
app.use(cors({ origin: 'http://localhost:3000' }))

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/uploads', express.static('uploads'))
app.use('/api/admin/settings', require('./routes/api/settings'))
app.use('/api/admin/auth', require('./routes/api/auth'))
app.use('/api/admin/users', require('./routes/api/users'))
app.use('/api/admin/categories', require('./routes/api/categories'))
app.use('/api/admin/goods', require('./routes/api/goods'))

// Define Errors catchers
app.use(function (req, res) {
  res.status(404).send('Sorry cant find that!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(chalk.magenta(`Server started on port ${PORT}`))
)
