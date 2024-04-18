const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const carRoutes = require('./routes/carRoutes')
const messageRoutes = require('./routes/messageRoutes')
const dotenv = require('dotenv');
dotenv.config()

const app = express()

// middleware
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// view engine
app.set('view engine', 'ejs')

// database connection
mongoose.connect(process.env.URI)
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log('Prisijungta prie MongoDB', process.env.PORT)
        })
    })
    .catch((err) => console.log(err))

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.use(authRoutes)
app.use(carRoutes)
app.use(messageRoutes)
