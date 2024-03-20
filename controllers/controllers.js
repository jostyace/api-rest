import path from 'node:path'
import fs from 'node:fs'
import { pool } from './../config/db.js'

export const basePath = process.cwd()

export const verArchivos = (req, res) => {
  const { nombre } = req.params
  res.sendFile(path.join(basePath, 'public/uploads', nombre))
}

export const eliminarArchivos = async (req, res) => {
  const { nombre } = req.params
  try {
    const query = 'DELETE FROM files WHERE file = ?'
    await pool.query(query, [nombre])
  } catch (error) {
    console.log(error.message)
  }
  const archivo = basePath + '/public/uploads/' + nombre
  const aEliminar = path.resolve(archivo)
  console.log(aEliminar)
  try {
    fs.unlinkSync(aEliminar)
    console.log('El archivo ha sido eliminado correctamente.')
  } catch (err) {
    console.error('Error al eliminar el archivo:', err)
  }
}

export const indexHtml = (req, res) => {
  res.sendFile(path.join(basePath, 'public', 'form.html'))
}

export const verTodos = async (req, res) => {
  try {
    const query = 'SELECT file FROM files'
    const [datos] = await pool.query(query)
    console.log(datos)
    res.json(datos)
  } catch (error) {

  }
}

// funcion para manejar el error
export const manejarError = (err, req, res, next) => {
  res.status(400).json({ error: 'Tipo de archivo no permitido ' + err.message })
}

// Guardamos el nombre en la Base de Datos
export async function guardarNombre (name) {
  try {
    const query = 'INSERT INTO files (file) VALUES (?)'
    await pool.query(query, [name])
  } catch (error) {
    console.log(error.message)
  }
}
