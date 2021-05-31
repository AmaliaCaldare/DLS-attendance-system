// eslint-disable-next-line import/extensions
import "regenerator-runtime/runtime.js";

import express from 'express';
import config from 'config';
import bodyparser from 'body-parser';

import routes from './api/routes';
import mongodbService from './api/services/mongodbService';
import webSocketService from './api/services/webSocketService';
import setHeaders from './api/middleware/setHeaders';

let service;
const start = async () => {
  await mongodbService.connect();

  const app = express();

  const port = config.get(`port`);

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(express.static(`public`));
  app.user(setHeaders);

  routes(app);

  service = app.listen(port);

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
