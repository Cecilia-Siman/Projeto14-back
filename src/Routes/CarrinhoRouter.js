import { MostraCarrinho, AdicionaCarrinho } from '../Controllers/CarrinhoController.js'
import { Router } from 'express'

const server = Router()

server.post('/carrinho', AdicionaCarrinho)

server.get('/carrinho', MostraCarrinho)

export default server;