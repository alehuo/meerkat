import express from 'express'
import helmet from 'helmet'
import session from 'express-session'
import { join } from 'path'
import { connect } from './database'
const MongoDBStore = require('connect-mongodb-session')(session)

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is undefined')
}
if (!process.env.DB_URI) {
  throw new Error('DB_URI is undefined')
}
if (!process.env.PORT) {
  throw new Error('PORT is undefined')
}

const port = parseInt(process.env.PORT, 10)

const app = express()
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: 'sessions'
})
store.on('error', function (error: any) {
  console.log(error)
})
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: store,
  resave: true,
  saveUninitialized: true
}))
app.use(helmet({
  contentSecurityPolicy: false
}))

app.use(express.static(join(__dirname, '..', '..', 'client', 'build')))

app.get('/health', (_req, res) => res.sendStatus(200))

app.all('/*', (_req, res) => res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html')))

connect().then(() => {
  app.listen(port, () => console.log(`App listeting on port ${port}`))
}).catch(err => {
  console.error(err)
})
