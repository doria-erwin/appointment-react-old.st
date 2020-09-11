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
} from '../util';
import { connect } from 'react-redux';
import { createAppointment } from '../store/actions';
import { isEqual } from 'lodash';
import Errors from '../components/Errors';

const columns = [
  {
    name: 'id',
    selector: 'id',
    sortable: true,
    center: true,
  },
  {
    name: 'From',
    selector: 'From',
    sortable: true,
    center: true,
  },
  {
    name: 'To',
    selector: 'To',
    sortable: true,
    center: true,
  },
  {
    name: 'Patient',
    selector: 'Patient',
    sortable: true,
    center: true,
  },
  {
    name: 'Comments',
    selector: 'Comments',
    sortable: true,
    center: true,
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
        <span className='text-warning p-1 cursor-pointer'>
          <MDBIcon icon='pencil-alt' />
        </span>
        <span className='text-danger p-1 cursor-pointer'>
          <MDBIcon icon='trash' />
        </span>
      </MDBContainer>
    ),
  },
];
const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

class App extends Component {
  state = {
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
  };

  handleEvent(event, picker) {
    console.log(picker.startDate);
  }

  handleCallback(start, end, label) {
    console.log(start);
  }

  handleShowDatePicker = () => {
    const { isShowDatePicker } = this.state;
    this.setState({ isShowDatePicker: !isShowDatePicker });
  };

  handleShowForm = () => {
    const { isShowForm } = this.state;
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
    const { hasError, errors, appoinment } = this.props;
    if (!isEqual(prevProps.hasError, hasError)) {
      this.setState({ errors });
    }

    if (!isEqual(prevProps.appoinment, appoinment)) {
      if (!hasError) {
        alert('Successfully added');
        this.handleResetState();
      }
    }
  }

  handleOnchange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOnSave = e => {
    e.preventDefault();
    const { createAppointment } = this.props;
    const {
      firstName,
      lastName,
      middleName,
      comments,
      startTime,
      endTime,
    } = this.state;
    if (startTime <= new Date()) {
      this.setState({ errors: 'Invalid start time' });
    } else {
      const data = {
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
      createAppointment(data);
    }
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
                  title='Add appoinment'
                  color='success'
                  className='p-2 shadow-none btn-action'
                >
                  <MDBIcon icon='plus-circle' />
                </MDBBtn>
              </div>
            </div>
            {isShowDatePicker && (
              <DateRangePicker
                onEvent={this.handleEvent}
                onCallback={this.handleCallback}
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
            <DataTable responsive columns={columns} data={data} pagination />
          </Fragment>
        )}
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  appoinment: state.appointment.appointment,
  isLoading: state.appointment.isLoading,
  hasError: state.appointment.hasError,
  errors: state.appointment.errors,
});
const mapDispatchToProps = dispatch => ({
  createAppointment: data => dispatch(createAppointment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
