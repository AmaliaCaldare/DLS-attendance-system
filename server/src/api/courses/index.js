import serverErrorSafe from '../../utils/serverErrorSafe';
import createCourse from './createCourse';
import getCourses from './getCourses';
import getCourseById from './getCourseById';
import getCoursesByStudent from './getCoursesByStudent';

export default {
  createCourse: serverErrorSafe(createCourse),
  getCourses: serverErrorSafe(getCourses),
  getCourseById: serverErrorSafe(getCourseById),
  getCoursesByStudent: serverErrorSafe(getCoursesByStudent)
};
