import { Router } from 'express'
import { verArchivos, indexHtml, manejarError, verTodos, eliminarArchivos } from './../controllers/controllers.js'
import { msg, subirArchivos } from './../config/multer.js'
const router = Router()

// Routes
router.post('/upload', subirArchivos.single('archivo'), manejarError, async (req, res) => {
  res.status(200).json({ message: msg })
})

router.get('/imagenes/:nombre', verArchivos)

router.delete('/imagenes/:nombre', eliminarArchivos)

router.get('/imagenes/', verTodos)

router.get('/', indexHtml)

export default router
