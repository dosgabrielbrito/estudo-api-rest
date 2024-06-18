import express from 'express';
import conectaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';

//Conexão com o BD:
const conexao = await conectaDatabase();

conexao.on('error', (erro) => {
    console.error('Erro de conexão:', erro);
});

conexao.once('open', () => {
    console.log('Conexão com o banco de dados feita com sucesso!');
});

//Chamar Instância do Express:
const app = express();
routes(app);

export default app;
