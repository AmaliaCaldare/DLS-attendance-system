import mongodbService from '../services/mongodbService';

const createCourse = async (req, res) => {
  const { name, teacherId, students } = req.body;

  await mongodbService.createCourse(name, teacherId, students);

  // check course was created
  res.status(200).send();
};

export default createCourse;
