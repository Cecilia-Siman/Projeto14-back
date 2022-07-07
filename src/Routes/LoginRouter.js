import { LoginUsuario } from '../Controllers/LoginController.js'
import { Router } from 'express'

const server = Router()

server.post('/login', LoginUsuario)

export default server;