/** @format */

import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBBtn, MDBIcon } from 'mdbreact';
import DataTable from 'react-data-table-component';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import TimePicker from '../components/TimePicker';
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import SearchInput from '../components/SearchInput';
import {
  startTime,
  endTime,
  startDate,
  endDate,
  dateInit,
  formatTime,
  getAppointment,
} from '../util';
import { connect } from 'react-redux';
import {
  createAppointment,
  showAllAppointments,
  deleteAppointment,
  showAppointmentById,
  updateAppointment,
  resetAppointment,
} from '../store/actions';
import { isEqual, get } from 'lodash';
import Errors from '../components/Errors';

class App extends Component {
  state = {
    isShowDatePicker: false,
    isShowForm: false,
    startDate,
    endDate,
    date: dateInit,
    id: undefined,
    startTime: startTime(),
    endTime: endTime(),
    firstName: '',
    lastName: '',
    middleName: '',
    comments: '',
    errors: [],
    appointments: [],
    columns: [
      {
        name: 'id',
        selector: 'id',
        sortable: true,
        center: true,
      },
      {
        name: 'From',
        selector: 'startTime',
        sortable: true,
        center: true,
      },
      {
        name: 'To',
        selector: 'endTime',
        sortable: true,
        center: true,
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
              onClick={() => this.handleShowAppointmentById(row.id)}
            >
              <MDBIcon icon='pencil-alt' />
            </span>
            <span
              className='text-danger p-1 cursor-pointer'
              onClick={() => this.handleDeleteAppointments(row.id)}
            >
              <MDBIcon icon='trash' />
            </span>
          </MDBContainer>
        ),
      },
    ],
  };

  handleEvent(event, picker) {}

  handleCallback(start, end, label) {
    this.setState({ startDate: start, endDate: end });
    this.handleShowAppointments();
  }

  handleShowAppointments(isAll) {
    const { startDate, endDate } = this.state;
    const { showAllAppointments } = this.props;

    const params = !isAll
      ? `?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format(
          'YYYY-MM-DD'
        )}`
      : '';

    showAllAppointments(params);
  }

  handleShowDatePicker = () => {
    const { isShowDatePicker } = this.state;
    isShowDatePicker
      ? this.handleShowAppointments(true)
      : this.handleShowAppointments();
    this.setState({ isShowDatePicker: !isShowDatePicker });
  };

  handleShowForm = () => {
    let { isShowForm } = this.state;
    const { resetAppointment } = this.props;
    if (isShowForm) {
      resetAppointment();
    }
    this.setState({ isShowForm: !isShowForm });
  };

  handleDateRange = dates => {
    if (dates) {
      const [start, end] = dates;
      this.setState({ startDate: start, endDate: end });
    } else {
      this.setState({ startDate: null, endDate: null });
    }
  };

  handleOnChangeTime = (key, time) => {
    const { date } = this.state;
    this.setState({ [key]: formatTime(date, time) });
  };

  handleOnChangeDate = date => {
    const { startTime, endTime } = this.state;
    this.setState({
      startTime: formatTime(date, startTime),
      endTime: formatTime(date, endTime),
      date,
    });
  };

  componentDidUpdate(prevProps) {
    const {
      hasError,
      errors,
      appointment,
      appointments,
      resetAppointment,
    } = this.props;
    if (!isEqual(prevProps.appointments, appointments)) {
      this.setState({ appointments: get(appointments, 'appointments', []) });
    }

    if (!isEqual(prevProps.hasError, hasError)) {
      this.setState({ errors });
    }

    if (!isEqual(prevProps.appointment, appointment)) {
      if (!hasError) {
        if (get(appointment, 'message', undefined)) {
          alert(appointment.message);
          resetAppointment();
          this.handleResetState();
          this.setState({ isShowDatePicker: false, id: undefined });
          this.handleShowAppointments(true);
        } else {
          const data = get(appointment, 'appointment', {});
          if (Object.keys(data).length > 0) {
            let { id, startTime, endTime, comment, patient } = data;
            this.setState({
              id,
              startTime: moment(startTime).toDate(),
              endTime: moment(endTime).toDate(),
              date: moment(startTime).toDate(),
              comments: get(comment, 'message', ''),
              firstName: get(patient, 'firstName', ''),
              lastName: get(patient, 'middleName', ''),
              middleName: get(patient, 'lastName', ''),
            });
            this.handleShowForm();
          }
        }
      }
    }
  }

  componentWillMount() {
    this.handleShowAppointments(true);
  }

  handleOnchange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOnSave = e => {
    e.preventDefault();
    const { createAppointment, updateAppointment } = this.props;
    const { id, startTime } = this.state;
    if (startTime <= new Date()) {
      this.setState({ errors: 'Invalid start time' });
    } else {
      const data = getAppointment(this.state, id == undefined);
      id ? updateAppointment(data) : createAppointment(data);
    }
  };

  handleDeleteAppointments = id => {
    const { deleteAppointment } = this.props;
    const isConfirm = window.confirm('Are you sure you want to delete?');
    if (isConfirm) deleteAppointment(id);
  };

  handleShowAppointmentById = id => {
    const { showAppointmentById } = this.props;
    showAppointmentById(id);
  };

  handleResetState() {
    this.setState({
      isShowDatePicker: false,
      isShowForm: false,
      startDate,
      endDate,
      date: dateInit,
      startTime: startTime(),
      endTime: endTime(),
      firstName: '',
      lastName: '',
      middleName: '',
      comments: '',
      errors: [],
    });
  }

  render() {
    const {
      isShowDatePicker,
      isShowForm,
      startDate,
      endDate,
      date,
      startTime,
      endTime,
      firstName,
      lastName,
      middleName,
      comments,
      errors,
      appointments,
      columns,
    } = this.state;

    return (
      <MDBContainer className='mt-5'>
        <h1>Doctor's Appointment</h1>
        {isShowForm && (
          <form onSubmit={this.handleOnSave}>
            {errors && <Errors errors={errors} />}
            <Input
              id='firstName'
              name='firstName'
              label='First name:'
              value={firstName}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <Input
              id='middleName'
              name='middleName'
              label='Middle name:'
              value={middleName}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <Input
              id='lastName'
              name='lastName'
              label='Last name:'
              value={lastName}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <TextArea
              id='comments'
              name='comments'
              label='Message:'
              value={comments}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <TimePicker
              id='startTime'
              selected={startTime}
              lable='Start time:'
              onChange={e => this.handleOnChangeTime('startTime', e)}
              timeInterval={30}
            />
            <TimePicker
              id='endTime'
              selected={endTime}
              lable='End time:'
              onChange={e => this.handleOnChangeTime('endTime', e)}
              timeInterval={30}
            />
            <DatePicker
              id='startTime'
              label='Date:'
              selected={date}
              onChange={this.handleOnChangeDate.bind(this)}
              filterDate={date => moment(date).weekday() !== 0}
              minDate={moment().add(1, 'days').toDate()}
            />
            <MDBBtn size='sm' type='submit'>
              Save
            </MDBBtn>
            <MDBBtn
              onClick={this.handleShowForm}
              size='sm'
              color='danger'
              type='reset'
            >
              Cancel
            </MDBBtn>
          </form>
        )}
        {!isShowForm && (
          <Fragment>
            <div className='d-flex w-100'>
              <div className='ml-auto'>
                <MDBBtn
                  onClick={this.handleShowDatePicker}
                  size='sm'
                  title={
                    !isShowDatePicker
                      ? 'Show appointment by date range'
                      : 'Hide calendar'
                  }
                  color={!isShowDatePicker ? 'info' : 'danger'}
                  className='p-2 shadow-none btn-action ml-custom'
                >
                  <MDBIcon
                    far
                    icon={!isShowDatePicker ? 'calendar-alt' : 'calendar-times'}
                  />
                </MDBBtn>
                <MDBBtn
                  onClick={this.handleShowForm}
                  size='sm'
                  title='Add appointment'
                  color='success'
                  className='p-2 shadow-none btn-action'
                >
                  <MDBIcon icon='plus-circle' />
                </MDBBtn>
              </div>
            </div>
            {isShowDatePicker && (
              <DateRangePicker
                onEvent={this.handleEvent.bind(this)}
                onCallback={this.handleCallback.bind(this)}
                initialSettings={{
                  startDate: startDate,
                  endDate: endDate,
                }}
              >
                <input
                  className='form-control form-control-sm ml-auto'
                  id='dateRangeInput'
                />
              </DateRangePicker>
            )}
            <SearchInput onChange={this.handleOnchange.bind(this)} />
            <DataTable
              responsive
              columns={columns}
              data={appointments}
              pagination
            />
          </Fragment>
        )}
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
  appointments: state.appointment.appointments,
  appointment: state.appointment.appointment,
  isLoading: state.appointment.isLoading,
  hasError: state.appointment.hasError,
  errors: state.appointment.errors,
});
const mapDispatchToProps = dispatch => ({
  createAppointment: data => dispatch(createAppointment(data)),
  showAllAppointments: data => dispatch(showAllAppointments(data)),
  deleteAppointment: data => dispatch(deleteAppointment(data)),
  showAppointmentById: data => dispatch(showAppointmentById(data)),
  updateAppointment: data => dispatch(updateAppointment(data)),
  resetAppointment: () => dispatch(resetAppointment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
