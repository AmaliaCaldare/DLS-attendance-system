import mongodbService from '../services/mongodbService';

const getCourses = async (req, res) => {
  const { role } = req.user;
  const allowedRoles = [`admin`, `teacher`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }
  const courses = await mongodbService.getCourses();

  if (!courses) {
    res.status(404).send({ error: `No courses found` });
    return;
  }
  res.status(200).send(courses);
};

export default getCourses;
