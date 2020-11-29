import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const apiPort = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api', router);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));