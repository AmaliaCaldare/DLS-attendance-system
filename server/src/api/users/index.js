import serverErrorSafe from '../../utils/serverErrorSafe';
import createUser from './createUser';
import getUsers from './getUsers';

export default {
  createUser: serverErrorSafe(createUser),
  getUsers: serverErrorSafe(getUsers)
};
