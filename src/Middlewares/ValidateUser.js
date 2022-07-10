import { db } from '../dbMongo/Mongo.js'

async function validateUser(req, res, next) {

    try {
        const { authorization } = req.headers

        const body = req.body

        const token = authorization?.replace('Bearer ', '')

        const chaveSecreta = process.env.JWT_SECRET;

        const dados = jwt.verify(token, chaveSecreta);

        const verificationToken = await db.collection("online").findOne({
            token
        })

        if (!verificationToken) {
            return res.status(401).send('Esse token não está online');
        }

        res.locals.dados = dados
        res.locals.body = body
    }
    catch {
        res.status(401).send('Esse token não é valido')
    }

    next()
}

export default validateUser;