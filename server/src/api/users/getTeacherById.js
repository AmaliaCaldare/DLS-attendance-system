import mongodbService from '../services/mongodbService';

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (!role) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const teacher = await mongodbService.getTeacherById(id);

  if (!teacher) {
    res.status(404).send({ error: `Could not find teacher with id ${id}` });
    return;
  }

  res.status(200).send(teacher);
};

export default getTeacherById;
