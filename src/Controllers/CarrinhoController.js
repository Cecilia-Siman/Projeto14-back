import { db } from '../dbMongo/Mongo.js'

export async function ConfereOnline(req, res) {

    const token = req.headers
    const produtosCarrinho = await db.collection("carrinho").find().toArray()
    res.send(produtosCarrinho)
}