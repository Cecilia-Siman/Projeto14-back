import { LoginUsuario } from '../Controllers/LoginController.js'
import { ConfereOnline } from '../Controllers/LoginController.js'
import { Router } from 'express'

const server = Router()

server.post('/login', LoginUsuario)

server.get('/login', ConfereOnline)

export default server;