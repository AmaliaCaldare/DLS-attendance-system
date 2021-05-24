import serverErrorSafe from '../../utils/serverErrorSafe';
import createClass from './createClass';
import getClasses from './getClasses';

export default {
  createClass: serverErrorSafe(createClass),
  getClasses: serverErrorSafe(getClasses)
};
