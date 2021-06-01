import mongodbService from '../services/mongodbService';

const getGroups = async (req, res) => {
  const { role } = req.user;

  if (!role) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const groups = await mongodbService.getGroups();

  if (!groups) {
    res.status(404).send({ error: `No groups found` });
    return;
  }
  res.status(200).send(groups);
};

export default getGroups;
