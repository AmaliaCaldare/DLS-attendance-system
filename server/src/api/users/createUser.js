import mongodbService from '../services/mongodbService';

const createUser = async (req, res) => {
  const {
    name, role, email, password
  } = req.body;

  if (await mongodbService.getUserByEmail(email)) {
    res.status(409).send({ error: `User already exists with email ${email}` });
    return;
  }

  const newUser = await mongodbService.createUser(name, role, email, password);
  res.status(200).send(newUser);
};

export default createUser;
