import serverErrorSafe from '../../utils/serverErrorSafe';
import createClass from './createClass';
import getClasses from './getClasses';
import getClassesByCourseId from './getClassesByCourseId';
import getClassById from './getClassById';
import getClassByTeacher from './getClassByTeacher';
import getClassByStudent from './getClassByStudent';

export default {
  createClass: serverErrorSafe(createClass),
  getClasses: serverErrorSafe(getClasses),
  getClassesByCourseId: serverErrorSafe(getClassesByCourseId),
  getClassById: serverErrorSafe(getClassById),
  getClassByTeacher: serverErrorSafe(getClassByTeacher),
  getClassByStudent: serverErrorSafe(getClassByStudent)
};
