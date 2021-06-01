import mongodbService from '../services/mongodbService';

const createGroup = async (req, res) => {
  const { name, students } = req.body;
  const { role } = req.user;
  const allowedRoles = [`admin`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const group = await mongodbService.createGroup(name, students);

  if (!group) {
    res.status(500).send({ error: `Could not create group` });
    return;
  }

  res.status(200).send(group);
};

export default createGroup;
