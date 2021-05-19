import mongodbService from '../services/mongodbService';

const getCourses = async (req, res) => {
  const courses = await mongodbService.getCourses();
  res.status(200).send(courses);
};

export default getCourses;
