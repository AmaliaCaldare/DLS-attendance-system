import authService from '../services/authService';
import mongodbService from '../services/mongodbService';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await mongodbService.getUserByEmail(email);
  if (!user || !await mongodbService.checkUserPassword(password, user.password)) {
    res.status(404).send({ error: `Wrong email or password` });
    return;
  }

  const accessToken = await authService.login(email, password, user.role);
  res.status(200).send(accessToken);
};

export default login;
