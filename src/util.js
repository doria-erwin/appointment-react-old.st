/** @format */
import React from 'react';
import { MDBContainer, MDBIcon } from 'mdbreact';
import { get } from 'lodash';
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

const params = (data, isAll, search) => {
  let { startDate, endDate } = data;
  search =
    search.trim(search).length > 0
      ? `${!isAll ? '&' : '?'}search=${search}`
      : '';
  const param = !isAll
    ? `?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format(
        'YYYY-MM-DD'
      )}`
    : '';
  return `${param}${search}`;
};

const colums = parent => {
  return [
    {
      name: 'id',
      selector: 'id',
      sortable: true,
      center: true,
    },
    {
      name: 'Date',
      selector: 'startTime',
      sortable: true,
      center: true,
      cell: row => <p>{moment(row.startTime).format('YYYY-MM-DD')}</p>,
    },
    {
      name: 'From',
      selector: 'startTime',
      sortable: true,
      center: true,
      cell: row => <p>{moment(row.startTime).format('hh:mm:ss A')}</p>,
    },
    {
      name: 'To',
      selector: 'endTime',
      sortable: true,
      cell: row => <p>{moment(row.endTime).format('hh:mm:ss A')}</p>,
    },
    {
      name: 'Patient',
      selector: 'patient',
      sortable: true,
      center: true,
      cell: row => (
        <p className='text-capitalize'>{`${get(
          row,
          'patient.lastName',
          ''
        )} ${get(row, 'patient.firstName', '')}, ${get(
          row,
          'patient.middleName',
          ''
        )}`}</p>
      ),
    },
    {
      name: 'Comments',
      selector: 'comment',
      sortable: true,
      center: true,
      cell: row => (
        <p className='text-capitalize'>{get(row, 'comment.message', '')}</p>
      ),
    },
    {
      name: 'Actions',
      selector: 'Actions',
      sortable: false,
      center: true,
      cell: row => (
        <MDBContainer
          id='container-action'
          className='d-flex justify-content-center p-2'
        >
          <span
            className='text-warning p-1 cursor-pointer'
            onClick={() => parent.handleShowAppointmentById(row.id)}
          >
            <MDBIcon icon='pencil-alt' />
          </span>
          <span
            className='text-danger p-1 cursor-pointer'
            onClick={() => parent.handleDeleteAppointments(row.id)}
          >
            <MDBIcon icon='trash' />
          </span>
        </MDBContainer>
      ),
    },
  ];
};

export {
  startDate,
  endDate,
  dateInit,
  startTime,
  endTime,
  formatTime,
  getAppointment,
  params,
  colums,
};
