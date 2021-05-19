import mongodbService from '../services/mongodbService';

const getUsers = async (req, res) => {
  const users = await mongodbService.getUsers();
  res.status(200).send(users);
};

export default getUsers;
