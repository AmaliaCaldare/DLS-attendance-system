import login from './login';
import serverErrorSafe from '../../utils/serverErrorSafe';

export default {
  login: serverErrorSafe(login)
};
