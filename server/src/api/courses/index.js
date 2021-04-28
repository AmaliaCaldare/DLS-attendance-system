import serverErrorSafe from '../../utils/serverErrorSafe';
import createCourse from './createCourse';
import getCourseStudents from './getCourseStudents';

export default {
  createCourse: serverErrorSafe(createCourse),
  getCourseStudents: serverErrorSafe(getCourseStudents)
};
