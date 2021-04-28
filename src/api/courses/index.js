import serverErrorSafe from '../../utils/serverErrorSafe';
import createCourse from './createCourse';

export default {
  createCourse: serverErrorSafe(createCourse)
};
