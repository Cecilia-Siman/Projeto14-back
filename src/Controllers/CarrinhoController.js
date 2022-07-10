import { db, objectId } from '../dbMongo/Mongo.js'
import jwt from 'jsonwebtoken';

// Mostra os itens do meu carrinho, ligados a minha conta
export async function MostraCarrinho(req, res) {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')

    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const dados = jwt.verify(token, chaveSecreta);
        const meUsuraio = await db.collection("users").findOne({ email: dados.email })
        const produtosCarrinho = await db.collection("carrinho").find({ idUser: objectId(meUsuraio._id) }).toArray()
        res.send(produtosCarrinho)

    } catch {
        res.status(401).send('Seu token foi adulterado ou passou da validade!')
    }
}

// Adiciona o produto escolhido no carrinho com o id do meu usuário
export async function AdicionaCarrinho(req, res) {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')

    const chaveSecreta = process.env.JWT_SECRET;

    const produto = req.body

    try {
        const dados = jwt.verify(token, chaveSecreta);
        const meUsuraio = await db.collection("users").findOne({ email: dados.email })
        const idUser = objectId(meUsuraio._id)
        const produtoAdicionado = { ...produto, idUser: idUser }
        await db.collection("carrinho").insertOne(produtoAdicionado)
        const produtosCarrinho = await db.collection("carrinho").find().toArray()
        res.send(produtosCarrinho)
    }
    catch {
        res.status(501).send('Não foi possível verificar seu carrinho!')
    }
}