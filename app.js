import express from 'express'
import path from 'path'

import { PORT } from './config/config.js'
import { basePath } from './controllers/controllers.js'
import misRouters from './routes/routes.js'

const app = express()
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Methods', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

app.use(express.static(path.join(basePath, 'public')))
app.use('/api', misRouters)

// Iniciar el Servidor
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT))
