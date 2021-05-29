import mongodbService from '../services/mongodbService';

const getStudents = async (req, res) => {
  const students = await mongodbService.getStudents();

  if (!students) {
    res.status(404).send({ error: `No students found` });
    return;
  }
  res.status(200).send(students);
};

export default getStudents;
