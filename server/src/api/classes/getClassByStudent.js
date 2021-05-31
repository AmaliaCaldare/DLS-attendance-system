import mongodbService from '../services/mongodbService';

const getClassByStudent = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const allowedRoles = [`admin`, `student`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
  }

  const classes = await mongodbService.getClassByStudent(id);

  res.status(200).send(classes);
};

export default getClassByStudent;
