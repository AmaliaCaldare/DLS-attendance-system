import firebaseService from "../services/firebaseService";

const createCourse = async (req, res) => {
  const { name, teacherId, students } = req.body;

  firebaseService.createCourse(name, teacherId, students);

  // check course was created
  res.status(200).send();
};

export default createCourse;
