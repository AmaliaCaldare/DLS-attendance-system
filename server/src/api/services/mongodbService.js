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

const createCourse = async (name, teacherId, students) => {
  await db.collection(`courses`)
    .insertOne({ name, teacherId, students });
};

const createClass = async (date, startTime, endTime, courseId, attendanceList) => {
  await db.collection(`classes`)
    .insertOne({
      date, startTime, endTime, courseId, attendanceList
    });
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
  createUser,
  getCourses,
  getUsers,
  getClasses,
  getTeachers,
  getStudents
};
