import path from 'path';

import status from './status';
import courses from './courses';
import classes from './classes';
import users from './users';

export default (app) => {
  app.get(`/status`, status.status);

  app.post(`/api/courses`, courses.createCourse);
  app.post(`/api/classes`, classes.createClass);
  app.post(`/api/users`, users.createUser);

  app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `../client/public/index.html'`));
  });
};
