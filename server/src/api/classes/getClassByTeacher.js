import mongodbService from '../services/mongodbService';

const getClassByTeacher = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const allowedRoles = [`admin`, `teacher`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const classes = await mongodbService.getClassByTeacher(id);
  res.status(200).send(classes);
};

export default getClassByTeacher;
