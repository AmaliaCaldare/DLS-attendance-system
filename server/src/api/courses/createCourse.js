import mongodbService from '../services/mongodbService';

const createCourse = async (req, res) => {
  const { name, teacherId, students } = req.body;
  const { role } = req.user;
  const allowedRoles = [`admin`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const course = await mongodbService.createCourse(name, teacherId, students);

  if (!course) {
    res.status(500).send({ error: `Could not create coruse` });
    return;
  }

  res.status(200).send(course);
};

export default createCourse;
