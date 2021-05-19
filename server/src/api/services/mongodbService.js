import { MongoClient } from 'mongodb';
import config from 'config';

let client;
let db;
const connect = async () => {
  const uri = `${config.get(`mongodbUri`)}`;

  client = await MongoClient(uri);
  await client.connect();

  db = client.db(`dls-attendance-system`);
};

const close = async () => {
  await client.close();
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
    .insertOne({ role, email });
};

const getCourses = async () => {
  const result = await db.collection(`courses`).find();

  console.log(result);

  return result;
};

const getUsers = async () => {
  const result = await db.collection(`users`).find();

  console.log(result);

  return result;
};

const getClasses = async () => {
  const result = await db.collection(`classes`).find();

  console.log(result);

  return result;
};

export default {
  connect,
  close,
  createCourse,
  createClass,
  createUser,
  getCourses,
  getUsers,
  getClasses
};
