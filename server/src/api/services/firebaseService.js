import admin from 'firebase-admin';

import serviceAccount from '../../../serviceAccountKey.json';

let db;

const setup = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  db = admin.firestore();
};

const createCourse = async (name, teacherId, students) => {
  await db.collection(`courses`)
    .add({ name, teacherId, students });
};

const createClass = async (date, startTime, endTime, courseId, attendanceList) => {
  await db.collection(`classes`)
    .add({
      date, startTime, endTime, courseId, attendanceList
    });
};

const createUser = async (name, role, email) => {
  await db.collection(`users`)
    .add({ role, email });
};

const getCourseStudents = async () => {
  const students = await db.collection(`courses`).get();

  return students;
};
export default {
  setup,
  createCourse,
  createClass,
  createUser,
  getCourseStudents
};
