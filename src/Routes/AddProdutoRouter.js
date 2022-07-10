import { AddProduto } from '../Controllers/AddProduto.js'
import { Router } from 'express'

const server = Router()

server.post('/produtos', AddProduto);

export default server;