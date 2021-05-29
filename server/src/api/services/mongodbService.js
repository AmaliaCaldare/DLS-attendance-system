import { MongoClient } from 'mongodb';
import config from 'config';

let client;
let db;
const connect = async () => {
  const uri = `${config.get(`mongodbUri`)}`;

  client = await MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();

  db = client.db(`dls-attendance-system`);
};

const createCourse = async (name, teacherId, group) => {
  const course = await db.collection(`courses`)
    .insertOne({ name, teacherId, group });

  return course.ops[0];
};

const createClass = async (date, startTime, endTime, courseId, attendanceList) => {
  const newClass = await db.collection(`classes`)
    .insertOne({
      date, startTime, endTime, courseId, attendanceList
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

const createUser = async (name, role, email) => {
  await db.collection(`users`)
    .insertOne({ name, role, email });
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

export default {
  connect,
  createCourse,
  createClass,
  createGroup,
  createUser,
  getCourses,
  getUsers,
  getClasses,
  getTeachers,
  getStudents,
  getGroups
};
