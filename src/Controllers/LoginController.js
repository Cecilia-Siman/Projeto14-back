import joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../dbMongo/Mongo.js'


export async function LoginUsuario(req, res) {

    const { email, senha } = req.body;

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

        // const existe = await db.collection("users").findOne({
        //     email
        // })

        // if (!existe) {
        //     res.status(401).send('Dados inválidos')
        // }

        // const autorizado = bcrypt.compareSync(senha, existe.senha)

        // if (!autorizado) {
        //     return res.status(401).send('Dados inválidos')
        // }

        const dados = {email,senha};
        const chaveSecreta = process.env.JWT_SECRET;
        const token = jwt.sign(dados, chaveSecreta);

        return res.status(200).send(token)
    }
    catch {
        return res.sendStatus(500)
    }
}