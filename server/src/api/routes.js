import status from './status';
import courses from './courses';
import classes from './classes';
import users from './users';
import groups from './groups';
import auth from './auth';

import authenticateJWT from "./middleware/authenticateJWT";

export default (app) => {
  app.get(`/status`, status.status);

  app.post(`/api/courses`, authenticateJWT, courses.createCourse);
  app.post(`/api/classes`, authenticateJWT, classes.createClass);
  app.post(`/api/users`, authenticateJWT, users.createUser);
  app.post(`/api/groups`, authenticateJWT, groups.createGroup);

  app.get(`/api/courses/get`, authenticateJWT, courses.getCourses);
  app.get(`/api/users/get`, authenticateJWT, users.getUsers);
  app.get(`/api/classes/get`, authenticateJWT, classes.getClasses);
  app.post(`/api/login`, auth.login);
  app.get(`/api/teachers/get`, authenticateJWT, users.getTeachers);
  app.get(`/api/students/get`, authenticateJWT, users.getStudents);
  app.get(`/api/groups/get`, authenticateJWT, groups.getGroups);
};
