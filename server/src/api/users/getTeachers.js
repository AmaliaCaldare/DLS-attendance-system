import mongodbService from '../services/mongodbService';

const getTeachers = async (req, res) => {
  const teachers = await mongodbService.getTeachers();

  if (!teachers) {
    res.status(404).send({ error: `No teachers found` });
    return;
  }
  res.status(200).send(teachers);
};

export default getTeachers;
