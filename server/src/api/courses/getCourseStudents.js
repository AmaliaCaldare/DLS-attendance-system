import firebaseService from '../services/firebaseService';

const getCourseStudents = async (req, res) => {
  const { courseName } = req.body;

  const students = await firebaseService.getCourseStudents(courseName);

  res.status(200).send(students);
};

export default getCourseStudents;
