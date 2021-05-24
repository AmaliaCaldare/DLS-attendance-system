import status from './status';
import courses from './courses';
import classes from './classes';
import users from './users';
import auth from './auth';

import authenticateJWT from "./middleware/authenticateJWT";

export default (app) => {
  app.get(`/status`, status.status);

  app.post(`/api/courses`, authenticateJWT, courses.createCourse);
  app.post(`/api/classes`, classes.createClass);
  app.post(`/api/users`, users.createUser);

  app.get(`/api/courses/get`, authenticateJWT, courses.getCourses);
  app.get(`/api/users/get`, authenticateJWT, users.getUsers);
  app.get(`/api/classes/get`, classes.getClasses);

  app.post(`/api/login`, auth.login);
};
