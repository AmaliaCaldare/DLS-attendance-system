import mongodbService from '../services/mongodbService';

const createCourse = async (req, res) => {
  const { name, teacherId, group } = req.body;
  const course = await mongodbService.createCourse(name, teacherId, group);

  if (!course) {
    res.status(500).send({ error: `Could not create coruse` });
    return;
  }

  res.status(200).send(course);
};

export default createCourse;
