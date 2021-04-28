import serverErrorSafe from '../../utils/serverErrorSafe';
import createUser from './createUser';

export default {
  createUser: serverErrorSafe(createUser)
};
