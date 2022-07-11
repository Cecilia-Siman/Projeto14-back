import joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../dbMongo/Mongo.js'


export async function LoginUsuario(req, res) {

    const { email, senha } = req.body;
    const chaveSecreta = process.env.JWT_SECRET;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        senha: joi.string().required()
    });

    try {
        const validation = userSchema.validate({ email, senha }, { abortEarly: true });

        if (validation.error) {
            console.log(validation.error.details)
            res.sendStatus(422)
            return
        }

        const existe = await db.collection("users").findOne({
            email
        })

        if (!existe) {
            res.status(401).send('Dados inválidos')
        }

        const dados = { email, senha: existe.senha };

        const autorizado = bcrypt.compareSync(senha, existe.password)

        if (!autorizado) {
            return res.status(401).send('Dados inválidos')
        }

        // const configuracoes = { expiresIn: 60 * 60 }

        const token = jwt.sign(dados, chaveSecreta);

        await db.collection("online").insertOne({
            token
        })

        return res.status(200).send(token)
    }
    catch {
        return res.sendStatus(500)
    }
}

export async function ConfereOnline(req, res) {
    const ususriosOnline = await db.collection("online").find().toArray()
    res.send(ususriosOnline)
}