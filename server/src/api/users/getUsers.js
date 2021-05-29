import mongodbService from '../services/mongodbService';

const getUsers = async (req, res) => {
  const users = await mongodbService.getUsers();
  const { role } = req.user;
  const allowedRoles = [`admin`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }
  if (!users) {
    res.status(404).send({ error: `No users found` });
    return;
  }
  res.status(200).send(users);
};

export default getUsers;
