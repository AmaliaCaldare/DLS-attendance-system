import randomstring from 'randomstring';
import socketIo from 'socket.io';

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

      let minutes = 1;
      let seconds = 0;
      let outOfTime = false;
      const startCountdown = setInterval(() => {
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
        }
        if (seconds <= 9) {
          socket.emit(`countdown`, `0${time.minutes}:0${time.seconds}`);
        }

        if (outOfTime && seconds === 0) {
          socket.emit(`countdown`, `00:00. Countdown finished.`);
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
