import mongodbService from '../services/mongodbService';

const getCoursesByStudent = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const allowedRoles = [`student`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const courses = await mongodbService.getCoursesByStudentId(id);

  if (!courses) {
    res.status(404).send({ error: `No courses for user ${id}` });
    return;
  }

  res.status(200).send(courses);
};

export default getCoursesByStudent;
