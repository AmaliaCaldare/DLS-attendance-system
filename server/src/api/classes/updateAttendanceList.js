import mongodbService from '../services/mongodbService';

const updateAttendanceList = async (req, res) => {
  const { classId } = req.params;
  const { studentId, check } = req.body;
  const { role } = req.user;
  const allowedRoles = [`student`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const result = await mongodbService.updateAttendanceList(studentId, classId, check);

  res.status(200).send(result);
};

export default updateAttendanceList;
