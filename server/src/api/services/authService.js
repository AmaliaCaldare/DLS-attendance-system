import jwt from 'jsonwebtoken';
import config from 'config';

const login = async (email, password, role) => {
  const accessTokenSecret = config.get(`accessTokenSecret`);
  const accessToken = await jwt.sign({ email, password, role }, accessTokenSecret, { expiresIn: `1d` });
  return { accessToken };
};

export default {
  login
};
