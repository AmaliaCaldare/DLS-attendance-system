import mongodbService from '../services/mongodbService';

const createGroup = async (req, res) => {
  const { name, students } = req.body;
  const group = await mongodbService.createGroup(name, students);

  if (!group) {
    res.status(500).send({ error: `Could not create group` });
    return;
  }

  res.status(200).send(group);
};

export default createGroup;
