import { db } from '../dbMongo/Mongo.js'
import jwt from 'jsonwebtoken';

async function validateUser(req, res, next) {

    const { authorization } = req.headers

    const chaveSecreta = process.env.JWT_SECRET;

    const token = authorization?.replace('Bearer ', '')

    const dados = jwt.verify(token, chaveSecreta);

    const body = req.body

    // try {

    //     const chaveSecreta = process.env.JWT_SECRET;

    //     const dados = jwt.verify(token, chaveSecreta);

    //     const verificationToken = await db.collection("online").findOne({
    //         token
    //     })

    //     if (!verificationToken) {
    //         return res.status(401).send('Esse token não está online');
    //     }

    //     res.locals.dados = dados
    //     res.locals.body = body
    // }
    // catch {
    //     res.status(401).send('Erro na validação')
    // }

    res.status(200).send(dados)

    next()
}

export default validateUser;