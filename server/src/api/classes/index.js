import serverErrorSafe from '../../utils/serverErrorSafe';
import createClass from './createClass';

export default {
  createClass: serverErrorSafe(createClass)
};
