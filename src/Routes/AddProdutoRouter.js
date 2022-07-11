import { AddProduto, MostraProduto } from '../Controllers/AddProduto.js'
import { Router } from 'express'

const server = Router()

server.post('/produtos', AddProduto);
server.get('/produtos', MostraProduto);

export default server;