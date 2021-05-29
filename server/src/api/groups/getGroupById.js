import mongodbService from '../services/mongodbService';

const getGroupById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (!role) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const group = await mongodbService.getGroupById(id);
  if (!group) {
    res.status(404).send({ error: `Could not find group with id ${id}` });
    return;
  }

  res.status(200).send(group);
};

export default getGroupById;
