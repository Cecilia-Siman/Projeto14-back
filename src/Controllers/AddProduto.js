import joi from 'joi'
import { db } from '../dbMongo/Mongo.js'

export async function AddProduto(req, res) {

    //     {
    //     nome: 'Via Láctea',
    //     estoque: [
    //         {
    //             imagem: 'https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/8465a67d00eda6b73b4485921e5fac7a.jpg',
    //             nome: 'Marte',
    //             tipo: 'Planeta',
    //             preco: '15000',
    //             descricao: 'Elon Musk ama'
    //         },
    //         {
    //             imagem: 'https://s2.glbimg.com/zx5dlKpOcTOKZ6s4j6_3HNfm9fE=/e.glbimg.com/og/ed/f/original/2019/05/23/astronomy-discovery-earth-2422.jpg',
    //             nome: 'Terra',
    //             tipo: 'Planeta',
    //             preco: '300000',
    //             descricao: 'Vida inclusa'
    //         },
    //         {
    //             imagem: 'https://super.abril.com.br/wp-content/uploads/2019/09/saturno.png',
    //             nome: 'Saturno',
    //             tipo: 'Planeta',
    //             preco: '75000',
    //             descricao: 'Anéis de compromisso'
    //         },
    //         {
    //             imagem: 'https://www.revistaplaneta.com.br/wp-content/uploads/sites/3/2019/08/netuno.jpg',
    //             nome: 'Netuno',
    //             tipo: 'Planeta',
    //             preco: '15000',
    //             descricao: 'Parece um smurf'
    //         }
    //     ]
    // },

    const { galaxia, nome, tipo, preco, descricao } = req.body

    const userSchema = joi.object({
        galaxia: joi.string().required(),
        nome: joi.string().required()
    });

    const valid = userSchema.validate({ galaxia, nome });

    const galaxias = await db.collection("produtos").findOne({ galaxia })

    if (valid) {
        if (galaxias) {

            const novoProduto = {
                nome,
                tipo,
                preco,
                descricao
            }
            const estoque = galaxias.estoque
            let novoEstoque = [...estoque, novoProduto]

            try {
                await db.collection("produtos").updateOne(
                    { galaxia },
                    {
                        $set: {
                            estoque: novoEstoque
                        }
                    }
                );

                const galaxiaAtualizada = await db.collection("produtos").findOne({ galaxia });
                return res.send(galaxiaAtualizada)
            }
            catch {
                return res.send('deu merda na atualização')
            }
        }
        else {
            const novaGalaxia = {
                galaxia: galaxia,
                estoque: []
            }
            const adicionaGalaxia = await db.collection("produtos").insertOne(novaGalaxia)
            return res.send('Gaalaxia adicionada')
        }
    } else {
        return res.send(404)
    }

    // if (valid) {

    //     const novoProduto = {
    //         nome,
    //         tipo,
    //         preco,
    //         descricao
    //     }
    //     const estoque = galaxias.estoque
    //     let novoEstoque = [...estoque, novoProduto]

    //     try {
    //         await db.collection("produtos").updateOne(
    //             { galaxia },
    //             {
    //                 $set: {
    //                     estoque: novoEstoque
    //                 }
    //             }
    //         );

    //         const galaxiaAtualizada = await db.collection("produtos").findOne({ galaxia });
    //         return res.send(galaxiaAtualizada)
    //     }
    //     catch {
    //         return res.send('deu merda na atualização')
    //     }
    // }
    // else {
    //     res.status(422).send(valid.error.details);
    // }
}