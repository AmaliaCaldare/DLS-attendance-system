import mongodbService from '../services/mongodbService';

const getClassById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (!role) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const foundClass = await mongodbService.getClassById(id);
  if (!foundClass) {
    res.status(404).send({ error: `Could not find class with id \${id}` });
    return;
  }

  res.status(200).send(foundClass);
};

export default getClassById;
