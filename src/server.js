import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import LoginRouter from './Routes/LoginRouter.js'
import CarrinhoRouter from './Routes/CarrinhoRouter.js'
import CadastroRouter from './Routes/CadastroRouter.js'
import validateUser from './Middlewares/ValidateUser.js'

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(LoginRouter);
server.use(CadastroRouter);

server.use(validateUser, CarrinhoRouter)
server.use(CadastraProduto)

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});