import firebaseService from '../services/firebaseService';

const createUser = async (req, res) => {
  const { name, role, email } = req.body;

  await firebaseService.createUser(name, role, email);

  // check user was created
  res.status(200).send();
};

export default createUser;
