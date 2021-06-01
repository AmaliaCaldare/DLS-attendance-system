import mongodbService from '../services/mongodbService';

const getAttendanceList = async (req, res) => {
  const { classId } = req.params;
  const { role } = req.user;
  const allowedRoles = [`teacher`];

  if (!allowedRoles.some((allowedRole) => allowedRole === role)) {
    res.status(403).send({ error: `You are not authorized to make this request` });
  }

  const attendanceList = await mongodbService.getAttendanceList(classId);
  if (!attendanceList) {
    res.status(404).send({
      error: `Could not find attendance for class with id ${classId}`
    });
  }

  res.status(200).send(attendanceList);
};

export default getAttendanceList;
