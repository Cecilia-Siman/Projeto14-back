import joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../dbMongo/Mongo.js'

export async function Cadastro(req, res) {

    console.log('entrou')

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required().pattern(/[a-zA-Z0-9]{6,}/),
        passwordConfirm: joi.any().equal(joi.ref('password')).required().messages({ 'different password': 'password does not match' }),
    });

    const valid = userSchema.validate(req.body);
    const repEmail = await db.collection("users").findOne({ email: req.body.email });

    if (!valid.error && !repEmail) {
        const cryptPassword = bcrypt.hashSync(req.body.password, 10);

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: cryptPassword,
        };

        await db.collection("users").insertOne(newUser);
        return res.status(201).send(valid.error);
    }
    else {
        return res.status(422).send(valid.error.details);
    }
}