import { Cadastro } from '../Controllers/CadastroController.js'
import { Router } from 'express'

const server = Router()

server.post('/produtos', CadastraProduto);

export default server;