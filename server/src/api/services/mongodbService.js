import { MongoClient } from 'mongodb';
import config from 'config';
import bcrypt from 'bcrypt';

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

const getUsers = async () => {
  const users = await db.collection(`users`).find().toArray();

  if (users.length > 0) {
    return users;
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

export default {
  connect,
  createCourse,
  createClass,
  createUser,
  getCourses,
  getUsers,
  getClasses,
  getUserByEmail,
  checkUserPassword
};
