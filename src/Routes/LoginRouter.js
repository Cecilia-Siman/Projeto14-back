import { LoginUsuario } from '../Controllers/LoginController.js'
import { Router } from 'express'

const server = Router()

server.post('/', LoginUsuario)

export default server;