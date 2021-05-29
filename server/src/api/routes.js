import status from './status';
import courses from './courses';
import classes from './classes';
import users from './users';
import groups from './groups';

export default (app) => {
  app.get(`/status`, status.status);

  app.post(`/api/courses`, courses.createCourse);
  app.post(`/api/classes`, classes.createClass);
  app.post(`/api/users`, users.createUser);
  app.post(`/api/groups`, groups.createGroup);

  app.get(`/api/courses/get`, courses.getCourses);
  app.get(`/api/users/get`, users.getUsers);
  app.get(`/api/classes/get`, classes.getClasses);
  app.get(`/api/teachers/get`, users.getTeachers);
  app.get(`/api/students/get`, users.getStudents);
  app.get(`/api/groups/get`, groups.getGroups);
};
