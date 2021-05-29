import mongodbService from '../services/mongodbService';

const createClass = async (req, res) => {
  const {
    date, startTime, endTime, courseId, attendanceList
  } = req.body;
  const { role } = req.user;
  const allowedRoles = [`admin`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }
  const newClass = await mongodbService
    .createClass(date, startTime, endTime, courseId, attendanceList);

  if (!newClass) {
    res.status(500).send({ error: `Could not create class` });
    return;
  }

  res.status(200).send(newClass);
};

export default createClass;
