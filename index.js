import express from 'express'
import 'dotenv/config'
import session from 'express-session'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server } from 'socket.io'
import router from './routes/index.js'

const app = express()
const server = createServer(app)
const io = new Server(server)

const port = process.env.PORT || 8000

app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/public', express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}))

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

app.use((req, _res, next) => {
    req.io = io
    next()
})

app.use('/', router)

server.listen(port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${port}`)
})
