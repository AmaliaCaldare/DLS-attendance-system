import mongodbService from '../services/mongodbService';

const getClasses = async (req, res) => {
  const classes = await mongodbService.getClasses();
  res.status(200).send(classes);
};

export default getClasses;
