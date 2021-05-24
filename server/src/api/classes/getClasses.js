import mongodbService from '../services/mongodbService';

const getClasses = async (req, res) => {
  const { role } = req.user;
  const allowedRoles = [`admin`, `teacher`, `student`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }
  const classes = await mongodbService.getClasses();

  if (!classes) {
    res.status(404).send({ error: `No classes found` });
    return;
  }
  res.status(200).send(classes);
};

export default getClasses;
