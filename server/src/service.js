// eslint-disable-next-line import/extensions
import "regenerator-runtime/runtime.js";

import express from 'express';
import config from 'config';
import bodyparser from 'body-parser';
import http from 'http';

import routes from './api/routes';
import mongodbService from './api/services/mongodbService';
import webSocketService from "./api/services/webSocketService";

let service;
const start = async () => {
  await mongodbService.connect();

  const app = express();

  const port = config.get(`port`);

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(express.static(`public`));

  routes(app);

  service = app.listen(port);
  /* service = http.Server(app);
  service.listen(port); */

  app.get(`/`, (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });
  // eslint-disable-next-line global-require
  /* (const io = require(`socket.io`)(service);
  io.on(`connection`, (socket) => {
    console.log(`Connectd`);
  });
*/
  await webSocketService.connect(service);
  await webSocketService.emitCode();
  console.log(`Now listening to port`, port);
};

const stop = async () => {
  await service.close();
};

export default {
  start, stop
};
