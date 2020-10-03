import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.set('json spaces', 4);
app.use(routes);

app.listen(3003, () => console.log('Server rodando na porta 3003'));

