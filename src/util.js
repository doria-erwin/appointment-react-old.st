/** @format */
import moment from 'moment';

const startDate = moment().weekday() === 0 ? moment().add(1, 'days') : moment();

const endDate =
  moment().add(1, 'days').weekday() === 0
    ? moment().add(2, 'days')
    : moment().add(1, 'days');

const dateInit = new Date();

const startTime = () => {
  const time = new Date();
  time.setHours(9);
  time.setMinutes(0);
  return time;
};

const endTime = () => {
  const time = new Date();
  time.setHours(9);
  time.setMinutes(30);
  return time;
};

const formatTime = (date, time) =>
  moment(
    `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm:00')}`
  ).toDate();

const getAppointment = (data, isNoId = true) => {
  const {
    id,
    firstName,
    lastName,
    middleName,
    comments,
    startTime,
    endTime,
  } = data;

  const appointment = {
    id,
    startTime: moment(startTime).format('YYYY-MM-DD HH:mm:00'),
    endTime: moment(endTime).format('YYYY-MM-DD HH:mm:00'),
    patient: {
      firstName,
      lastName,
      middleName,
    },
    comment: {
      message: comments,
    },
  };

  if (isNoId) delete appointment.id;

  return appointment;
};

export {
  startDate,
  endDate,
  dateInit,
  startTime,
  endTime,
  formatTime,
  getAppointment,
};
