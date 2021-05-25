import mongodbService from '../services/mongodbService';

const createClass = async (req, res) => {
  const {
    date, startTime, endTime, courseId, attendanceList
  } = req.body;

  const newClass = await mongodbService
    .createClass(date, startTime, endTime, courseId, attendanceList);

  if (!newClass) {
    res.status(500).send({ error: `Could not create class` });
    return;
  }

  res.status(200).send(newClass);
};

export default createClass;
