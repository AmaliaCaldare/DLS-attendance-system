import serverErrorSafe from '../../utils/serverErrorSafe';
import createClass from './createClass';
import getClasses from './getClasses';
import getClassesByCourseId from './getClassesByCourseId';

export default {
  createClass: serverErrorSafe(createClass),
  getClasses: serverErrorSafe(getClasses),
  getClassesByCourseId: serverErrorSafe(getClassesByCourseId)
};
