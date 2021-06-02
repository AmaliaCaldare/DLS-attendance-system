import randomstring from 'randomstring';
import socketIo from 'socket.io';

import mongodbService from './mongodbService';

const generateCode = () => {
  const code = randomstring.generate(7);
  return code;
};

let io;
const connect = async (server) => {
  io = socketIo(server);
};

const emitCode = async () => {
  io.on(`connection`, (socket) => {
    console.log(`Socket connected`);
    socket.on(`clicked`, (data) => {
      const code = generateCode();
      socket.emit(`code`, code);
      socket.broadcast.emit(`check`, code);
      socket.broadcast.emit(`class`, data);
      let minutes = 1;
      let seconds = 0;
      let outOfTime = false;
      const startCountdown = setInterval(async () => {
        if (seconds === 0) {
          minutes -= 1;
          seconds = 60;
        }
        if (minutes === 0) {
          outOfTime = true;
        }
        seconds -= 1;
        const time = { minutes, seconds };
        if (seconds > 9) {
          socket.emit(`countdown`, `0${time.minutes}:${time.seconds}`);
          socket.broadcast.emit(`countdown-student`, `0${time.minutes}:${time.seconds}`);
        }
        if (seconds <= 9) {
          socket.emit(`countdown`, `0${time.minutes}:0${time.seconds}`);
          socket.broadcast.emit(`countdown-student`, `0${time.minutes}:0${time.seconds}`);
        }

        if (outOfTime && seconds === 0) {
          socket.emit(`countdown`, `00:00. Countdown finished.`);
          socket.broadcast.emit(`countdown-student`, `over`);
          await mongodbService.setStudentsWithNoAttendance(data.groupId,
          // eslint-disable-next-line no-underscore-dangle
            data._id, data.attendanceList);

          clearInterval(startCountdown);
        }
      }, 1000);
    });
  });
};

export default {
  connect,
  emitCode
};
