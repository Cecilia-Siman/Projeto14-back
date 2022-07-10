import { db } from '../dbMongo/Mongo.js'
import jwt from 'jsonwebtoken';

export async function MostraCarrinho(req, res) {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')
    console.log(token)

    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const dados = jwt.verify(token, chaveSecreta);
        const meUsuraio = await db.collection("users").find().toArray()
        // const produtosCarrinho = await db.collection("carrinho").find({}).toArray()
        res.send(meUsuraio)

    } catch {
        // alert('seu token foi adulterado ou passou da validade!')
        res.send(401)
    }

    // res.send(dados)
}


export async function AdicionaCarrinho(req, res) {

    const token = req.headers

    const produto = req.body

    try {
        const produtosCarrinho = await db.collection("carrinho").insertOne(produto)
        res.send('OK')
    }
    catch {
        res.status(501).send('Não foi possível verificar seu carrinho!')
    }
}

