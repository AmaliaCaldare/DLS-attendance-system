import status from './status';

export default (app) => {
  app.get(`/status`, status.status);
};
