import { CadastroUsuario } from '../Controllers/RegisterController.js'
import { Router } from 'express'

const server = Router()

server.post('/cadastro', CadastroUsuario)

export default server;