import serverErrorSafe from '../../utils/serverErrorSafe';
import createGroup from './createGroup';
import getGroups from './getGroups';

export default {
  createGroup: serverErrorSafe(createGroup),
  getGroups: serverErrorSafe(getGroups)
};
