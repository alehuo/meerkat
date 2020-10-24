import express from 'express'
import helmet from 'helmet'
import { join } from 'path'

const app = express()
app.use(helmet({
  contentSecurityPolicy: false
}))

app.use(express.static(join(__dirname, '..', '..', 'client', 'build')))

app.get('/health', (_req, res) => res.sendStatus(200))

app.all('/*', (_req, res) => res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html')))

app.listen(3000, () => console.log('App listeting on port 3000'))
