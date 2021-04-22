import express from 'express';
import config from 'config';
import bodyparser from 'body-parser';

const app = express();
const port = config.get("port");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

const server = app.listen(port);

