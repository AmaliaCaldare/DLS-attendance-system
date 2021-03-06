import serverErrorSafe from '../../utils/serverErrorSafe';
import createUser from './createUser';
import getUsers from './getUsers';
import getTeachers from './getTeachers';
import getStudents from './getStudents';
import getTeacherById from './getTeacherById';
import getStudentById from './getStudentById';

export default {
  createUser: serverErrorSafe(createUser),
  getUsers: serverErrorSafe(getUsers),
  getTeachers: serverErrorSafe(getTeachers),
  getStudents: serverErrorSafe(getStudents),
  getTeacherById: serverErrorSafe(getTeacherById),
  getStudentById: serverErrorSafe(getStudentById)
};
