import serverErrorSafe from '../../utils/serverErrorSafe';
import createUser from './createUser';
import getUsers from './getUsers';
import getTeachers from './getTeachers';
import getStudents from './getStudents';

export default {
  createUser: serverErrorSafe(createUser),
  getUsers: serverErrorSafe(getUsers),
  getTeachers: serverErrorSafe(getTeachers),
  getStudents: serverErrorSafe(getStudents)
};
