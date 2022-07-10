import { MostraCarrinho, AdicionaCarrinho, RemoveCarrinho } from '../Controllers/CarrinhoController.js'
import { Router } from 'express'

const server = Router()

server.post('/carrinho', AdicionaCarrinho)

server.get('/carrinho', MostraCarrinho)

server.delete('/carrinho', RemoveCarrinho)

export default server;