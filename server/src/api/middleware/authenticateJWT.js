import config from 'config';
import jwt from 'jsonwebtoken';

import mongodbService from '../services/mongodbService';

const authenticateJWT = async (req, res, next) => {
  const accessTokenSecret = config.get(`accessTokenSecret`);
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(` `)[1];

    try {
      const user = await jwt.verify(token, accessTokenSecret);
      req.user = user;
      next();
    }
    catch (error) {
      res.status(403).send({ error: `You are not authorized to make this request` });
    }
  }
  else {
    res.status(401).send({ error: `You are not authorized to make this request` });
  }
};

export default authenticateJWT;
