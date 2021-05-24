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
  await mongodbService.createClass(date, startTime, endTime, courseId, attendanceList);

  // check class was created;
  res.status(200).send();
};

export default createClass;
