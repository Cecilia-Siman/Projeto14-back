import { LoginUsuario } from '../Controllers/LoginController.js'
import { ConfereOnline } from '../Controllers/LoginController.js'
import { Router } from 'express'

const server = Router()

server.post('/', LoginUsuario)
server.get('/', ConfereOnline)

export default server;