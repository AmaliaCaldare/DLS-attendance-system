import mongodbService from '../services/mongodbService';

const getUsers = async (req, res) => {
  const users = await mongodbService.getUsers();

  if (!users) {
    res.status(404).send({ error: `No users found` });
    return;
  }
  res.status(200).send(users);
};

export default getUsers;
