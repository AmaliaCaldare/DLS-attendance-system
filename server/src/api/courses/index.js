import serverErrorSafe from '../../utils/serverErrorSafe';
import createCourse from './createCourse';
import getCourses from './getCourses';

export default {
  createCourse: serverErrorSafe(createCourse),
  getCourses: serverErrorSafe(getCourses)
};
