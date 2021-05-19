import mongodbService from '../services/mongodbService';

const getClasses = async (req, res) => {
  const classes = await mongodbService.getClasses();

  if (!classes) {
    res.status(404).send({ error: `No classes found` });
    return;
  }
  res.status(200).send(classes);
};

export default getClasses;
