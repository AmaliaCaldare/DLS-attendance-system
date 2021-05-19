import mongodbService from '../services/mongodbService';

const getCourses = async (req, res) => {
  const courses = await mongodbService.getCourses();

  if (!courses) {
    res.status(404).send({ error: `No courses found` });
    return;
  }
  res.status(200).send(courses);
};

export default getCourses;
