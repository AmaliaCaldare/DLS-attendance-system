import mongodbService from '../services/mongodbService';

const setStudentsWithNoAttendance = async (req, res) => {
  const { classId } = req.params;
  const { groupId, attendanceList } = req.body;
  const { role } = req.user;
  const allowedRoles = [`teacher`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
    return;
  }

  const result = await mongodbService.setStudentsWithNoAttendance(groupId, classId, attendanceList);

  res.status(200).send(result);
};

export default setStudentsWithNoAttendance;
