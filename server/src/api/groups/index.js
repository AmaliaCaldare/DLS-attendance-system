import serverErrorSafe from '../../utils/serverErrorSafe';
import createGroup from './createGroup';
import getGroups from './getGroups';
import getGroupById from './getGroupById';

export default {
  createGroup: serverErrorSafe(createGroup),
  getGroups: serverErrorSafe(getGroups),
  getGroupById: serverErrorSafe(getGroupById)
};
