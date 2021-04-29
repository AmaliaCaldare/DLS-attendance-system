import firebaseService from '../services/firebaseService';

const getCourses = async (req, res) => {
  const courses = await firebaseService.getCourses();
  res.status(200).send(courses);
};

export default getCourses;
