import status from './status';
import serverErrorSafe from "../../utils/serverErrorSafe";
export default {
  status: serverErrorSafe(status)
};
