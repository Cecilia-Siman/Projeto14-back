import { db, objectId } from '../dbMongo/Mongo.js'

// Mostra os itens do meu carrinho, ligados a minha conta
export async function MostraCarrinho(req, res) {

    const dados = res.locals.dados

    const body = res.locals.body

    try {

        const meUsuraio = await db.collection("users").findOne({ email: dados.email })
        const produtosCarrinho = await db.collection("carrinho").find({ idUser: objectId(meUsuraio._id) }).toArray()
        res.send(produtosCarrinho)

    } catch {
        res.status(401).send('Usuário não encontrado!')
    }
}

// Adiciona o produto escolhido no carrinho com o id do meu usuário
export async function AdicionaCarrinho(req, res) {

    const dados = res.locals.dados

    const produto = res.locals.body

    try {
        const meUsuraio = await db.collection("users").findOne({ email: dados.email })
        const idUser = objectId(meUsuraio._id)
        const produtoAdicionado = { ...produto, idUser: idUser }
        const existeProduto = await db.collection("carrinho").find(
            {
                $and: [{ nome: produto.nome }, { idUser: objectId(meUsuraio._id) }]
            }
        ).toArray()
        if (existeProduto.length === 0) {
            await db.collection("carrinho").insertOne(produtoAdicionado)
            const produtosCarrinho = await db.collection("carrinho").find().toArray()
            return res.send(produtosCarrinho)
        }
        else {
            return res.status(422).send('Produto já está no carrinho')
        }

    }
    catch {
        res.status(501).send('Não foi possível verificar seu carrinho!')
    }
}


// Remove o produto escolhido no carrinho com o id do meu usuário
export async function RemoveCarrinho(req, res) {

    const dados = res.locals.dados

    const produto = res.locals.body

    try {
        const meUsuraio = await db.collection("users").findOne({ email: dados.email })
        const idUser = objectId(meUsuraio._id)
        // const produtoAdicionado = { ...produto, idUser: idUser }
        // await db.collection("carrinho").insertOne(produtoAdicionado)
        const produtApagar = await db.collection("carrinho").deleteOne(
            {
                $and: [{ nome: produto.nome }, { idUser: objectId(meUsuraio._id) }]
            }
        )
        return res.send("Apagado")
    }
    catch {
        res.status(501).send('Não foi possível apagar seu carrinho!')
    }
}