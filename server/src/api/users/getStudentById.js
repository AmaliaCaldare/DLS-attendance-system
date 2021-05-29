import mongodbService from '../services/mongodbService';

const getStudentById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (!role) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const student = await mongodbService.getStudentById(id);
  if (!student) {
    res.status(404).send({ error: `Could not find student with id ${id}` });
    return;
  }

  res.status(200).send(student);
};

export default getStudentById;
