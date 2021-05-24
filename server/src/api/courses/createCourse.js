import mongodbService from '../services/mongodbService';

const createCourse = async (req, res) => {
  const { name, teacherId, students } = req.body;
  const { role } = req.user;
  const allowedRoles = [`admin`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }
  await mongodbService.createCourse(name, teacherId, students);

  // check course was created
  res.status(200).send();
};

export default createCourse;
