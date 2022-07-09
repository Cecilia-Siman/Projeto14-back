import { db } from '../dbMongo/Mongo.js'

export async function MostraCarrinho(req, res) {

    const token = req.headers
    const produtosCarrinho = await db.collection("carrinho").find().toArray()
    res.send(produtosCarrinho)
}


export async function AdicionaCarrinho(req, res) {

    const token = req.headers
    const produtosCarrinho = await db.collection("carrinho").find().toArray()
    res.send(produtosCarrinho)
}

