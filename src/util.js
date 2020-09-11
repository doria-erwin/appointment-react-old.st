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

export { startDate, endDate, dateInit, startTime, endTime, formatTime };
