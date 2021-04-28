// eslint-disable-next-line import/extensions
import "regenerator-runtime/runtime.js";

import express from 'express';
import config from 'config';
import bodyparser from 'body-parser';

import routes from './api/routes';
import firebaseService from './api/services/firebaseService';

let service;
const start = async () => {
  const app = express();
  const port = config.get("port");

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(express.static('public'));

  routes(app);

  service = app.listen(port);
  console.log("Now listening to port", port);

  await firebaseService.setup();
};

const stop = async () => {
  await service.close();
};

export default {
  start, stop
};
