import mongodbService from '../services/mongodbService';

const getClassesByCourseId = async (req, res) => {
  const { courseId } = req.params;
  const { role } = req.user;

  if (!role) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  if (!await mongodbService.getCourseById(courseId)) {
    res.status(404).send({ error: `Could not find course with id ${courseId}` });
    return;
  }

  const classes = await mongodbService.getClassesByCourseId(courseId);

  if (!classes) {
    res.status(404).send({ error: `Could not find class for the course with id ${courseId}` });
    return;
  }

  res.status(200).send(classes);
};

export default getClassesByCourseId;
