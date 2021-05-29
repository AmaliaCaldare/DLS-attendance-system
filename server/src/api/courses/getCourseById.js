import mongodbService from '../services/mongodbService';

const getCourseById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (!role) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const course = await mongodbService.getCourseById(id);

  if (!course) {
    res.status(404).send({ error: `Could not find course with id ${id}` });
    return;
  }

  res.status(200).send(course);
};

export default getCourseById;
