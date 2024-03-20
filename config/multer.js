import multer from 'multer'
import { guardarNombre } from './../controllers/controllers.js'

export let msg = ''
let nombre = ''

// Definimos el almacenamientyo
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    nombre = file.originalname.trim().replace(/\s+/g, '').toLowerCase()
    cb(null, nombre)
  }
})

// Manejo del archivo
export const subirArchivos = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true)
    guardarNombre(nombre)
    msg = 'El Archivo ' + nombre + ' Fue subido Correctamente'
  }
})
