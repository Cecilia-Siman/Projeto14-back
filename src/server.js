import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import LoginRouter from './Routes/LoginRouter.js'
import CadastroRouter from './Routes/CadastroRouter.js'

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(LoginRouter);
server.use(CadastroRouter);

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});