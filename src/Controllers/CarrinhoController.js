import { db } from '../dbMongo/Mongo.js'
import jwt from 'jsonwebtoken';

export async function MostraCarrinho(req, res) {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')
    console.log(token)

    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const dados = jwt.verify(token, chaveSecreta);
        console.log(dados)

    } catch {
        alert('seu token foi adulterado!')
        res.send(401)
    }
    const produtosCarrinho = await db.collection("carrinho").find().toArray()
    res.send(produtosCarrinho)
}


export async function AdicionaCarrinho(req, res) {

    const token = req.headers
    const produtosCarrinho = await db.collection("carrinho").find().toArray()
    res.send(produtosCarrinho)
}

