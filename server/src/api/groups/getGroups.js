import mongodbService from '../services/mongodbService';

const getGroups = async (req, res) => {
  const groups = await mongodbService.getGroups();

  if (!groups) {
    res.status(404).send({ error: `No groups found` });
    return;
  }
  res.status(200).send(groups);
};

export default getGroups;
