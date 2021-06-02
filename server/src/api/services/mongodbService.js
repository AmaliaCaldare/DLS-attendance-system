import { MongoClient, ObjectID } from 'mongodb';
import config from 'config';
import bcrypt from 'bcrypt';
import _ from 'lodash';

let client;
let db;

const connect = async () => {
  const uri = `${config.get(`mongodbUri`)}`;

  client = await MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();

  db = client.db(`dls-attendance-system`);
};

const createCourse = async (name, teacherId, groups) => {
  const course = await db.collection(`courses`)
    .insertOne({ name, teacherId, groups });

  return course.ops[0];
};

const createClass = async (date, startTime, endTime, courseId, groupId, attendanceList) => {
  const newClass = await db.collection(`classes`)
    .insertOne({
      date, startTime, endTime, courseId, groupId, attendanceList
    });
  return newClass.ops[0];
};

const createGroup = async (name, students) => {
  const newGroup = await db.collection(`groups`)
    .insertOne({
      name, students
    });
  return newGroup.ops[0];
};

const createUser = async (name, role, email, password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await db.collection(`users`)
    .insertOne({
      name, role, email, password: hashedPassword
    });

  const finalResult = result.ops[0];

  return {
    id: finalResult.id, name: finalResult.name, role: finalResult.role, email: finalResult.email
  };
};

const getCourses = async () => {
  const courses = await db.collection(`courses`).find().toArray();

  if (courses.length > 0) {
    return courses;
  }
  return null;
};

const getGroups = async () => {
  const groups = await db.collection(`groups`).find().toArray();

  if (groups.length > 0) {
    return groups;
  }
  return null;
};

const getUsers = async () => {
  const users = await db.collection(`users`).find().toArray();

  if (users.length > 0) {
    return users;
  }
  return null;
};

const getTeachers = async () => {
  const teachers = await db.collection(`users`).find({ role: `teacher` }).toArray();

  if (teachers.length > 0) {
    return teachers;
  }
  return null;
};

const getStudents = async () => {
  const students = await db.collection(`users`).find({ role: `student` }).toArray();

  if (students.length > 0) {
    return students;
  }
  return null;
};

const getClasses = async () => {
  const classes = await db.collection(`classes`).find().toArray();

  if (classes.length > 0) {
    return classes;
  }
  return null;
};

const getUserByEmail = async (email) => {
  const user = await db.collection(`users`).findOne({ email });
  return user;
};

const checkUserPassword = async (password, userPassword) => bcrypt.compareSync(
  password, userPassword
);

const getClassesByCourseId = async (courseId) => {
  const classes = await db.collection(`classes`).find({ courseId }).toArray();

  if (classes.length > 0) {
    return classes;
  }

  return null;
};

const getCourseById = async (id) => {
  const oId = new ObjectID(id);

  const course = await db.collection(`courses`).findOne({ _id: oId });

  return course;
};

const getTeacherById = async (id) => {
  const oId = new ObjectID(id);

  const teacher = await db.collection(`users`).findOne({ _id: oId });

  return teacher;
};

const getGroupById = async (id) => {
  const oId = new ObjectID(id);

  const group = await db.collection(`groups`).findOne({ _id: oId });

  return group;
};

const getClassById = async (id) => {
  const oId = new ObjectID(id);

  const foundClass = await db.collection(`classes`).findOne({ _id: oId });

  return foundClass;
};

const getStudentById = async (id) => {
  const oId = new ObjectID(id);

  const student = await db.collection(`users`).findOne({ _id: oId });

  return student;
};

const getCoursesByStudentId = async (id) => {
  const groups = await db.collection(`groups`).find().toArray();
  const groupWithStudent = _.chain(groups).map((group) => {
    if (group.students.includes(id)) {
      return group;
    }
    return null;
  }).filter((group) => group !== null).value();

  const courses = await db.collection(`courses`).find().toArray();
  const coursesByStudent = _.chain(courses).map((course) => {
    // eslint-disable-next-line no-underscore-dangle
    if (course.groups && course.groups.includes(ObjectID(groupWithStudent[0]._id).toString())) {
      return course;
    }
    return null;
  }).filter((course) => course !== null).value();

  return coursesByStudent;
};

const getClassByTeacher = async (id) => {
  const courses = await db.collection(`courses`).find({ teacherId: id }).toArray();
  const classesList = [];

  await Promise.all(
    _.map(courses, async (course) => {
    // eslint-disable-next-line no-underscore-dangle
      const courseId = ObjectID(course._id).toString();

      const list = await db.collection(`classes`).find({ courseId }).toArray();
      if (list.length > 0) {
        _.map((list), (element) => {
          classesList.push(element);
        });
      }
    })
  );

  return classesList;
};

const getClassByStudent = async (id) => {
  const groups = await db.collection(`groups`).find().toArray();
  const groupWithStudent = _.chain(groups).map((group) => {
    if (group.students.includes(id)) {
      // eslint-disable-next-line no-underscore-dangle
      return ObjectID(group._id).toString();
    }
    return null;
  }).filter((group) => group !== null).value();

  const classesList = await db.collection(`classes`).find({ groupId: groupWithStudent[0] }).toArray();

  return classesList;
};

const getAttendanceList = async (classId) => {
  const foundClass = await getClassById(classId);

  if (foundClass) {
    return foundClass.attendanceList;
  }
  return null;
};

const updateAttendanceList = async (studentId, classId, boolean) => {
  const oId = new ObjectID(classId);
  const attendanceList = await getAttendanceList(classId);

  if (!attendanceList.filter((result) => result.studentId === studentId).length > 0) {
    const data = { studentId, attendanceCheck: boolean };
    const updateDocument = {
      $push: { attendanceList: data }
    };
    await db.collection(`classes`).updateOne({ _id: oId }, updateDocument);
  }

  const updatedAttendanceList = await getAttendanceList(classId);

  return updatedAttendanceList;
};

const setStudentsWithNoAttendance = async (groupId, classId, attendanceList) => {
  const oId = new ObjectID(groupId);
  const group = await db.collection(`groups`).findOne({ _id: oId });
  const attendanceListIds = _.map(attendanceList, (list) => list.studentId);
  const { students } = group;

  const noAttendanceList = students.filter((student) => !attendanceListIds.includes(student));

  const updatedList = await Promise.all(_.map(noAttendanceList, async (result) => {
    await updateAttendanceList(result, classId, false);
  }));

  return updatedList;
};

export default {
  connect,
  createCourse,
  createClass,
  createGroup,
  createUser,
  getCourses,
  getUsers,
  getClasses,
  getUserByEmail,
  checkUserPassword,
  getTeachers,
  getStudents,
  getGroups,
  getClassesByCourseId,
  getCourseById,
  getTeacherById,
  getGroupById,
  getClassById,
  getStudentById,
  getCoursesByStudentId,
  getClassByTeacher,
  getClassByStudent,
  updateAttendanceList,
  getAttendanceList,
  setStudentsWithNoAttendance
};
