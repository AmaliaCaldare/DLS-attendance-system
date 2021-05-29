import serverErrorSafe from '../../utils/serverErrorSafe';
import createCourse from './createCourse';
import getCourses from './getCourses';
import getCourseById from './getCourseById';

export default {
  createCourse: serverErrorSafe(createCourse),
  getCourses: serverErrorSafe(getCourses),
  getCourseById: serverErrorSafe(getCourseById)
};
