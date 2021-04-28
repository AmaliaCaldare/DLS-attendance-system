import firebaseService from '../services/firebaseService';

const createClass = async (req, res) => {
  const {
    date, startTime, endTime, courseId, attendanceList
  } = req.body;

  await firebaseService.createClass(date, startTime, endTime, courseId, attendanceList);

  // check class was created;
  res.status(200).send();
};

export default createClass;
