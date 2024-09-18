import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorErros.js';
import manipulador404 from './middlewares/manipulador404.js';

//Setar conexão com o MongoDB:
db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

//Iniciar Instância do Express:
const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

//Iniciar Middleware Manipulador de Erros:
app.use(manipuladorDeErros);

export default app;
