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
import { startTime, endTime, startDate, endDate, dateInit } from '../util';
import { connect } from 'react-redux';
import { createAppointment } from '../store/actions';

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
    // const { isShowForm } = this.state;
    // this.setState({ isShowForm: !isShowForm });
    const { createAppointment } = this.props;
    createAppointment({});
  };

  componentDidUpdate(nextProps) {
    console.log(nextProps);
  }

  handleDateRange = dates => {
    if (dates) {
      const [start, end] = dates;
      this.setState({ startDate: start, endDate: end });
    } else {
      this.setState({ startDate: null, endDate: null });
    }
  };

  handleOnChangeStartTime = date => {
    this.setState({ startTime: date });
  };

  handleOnChangeEndTime = date => {
    this.setState({ endTime: date });
  };

  handleOnChangeDate = date => {
    this.setState({ date: date });
  };

  handleOnchange = event => {};

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
    } = this.state;

    return (
      <MDBContainer className='mt-5'>
        <h1>Doctor's Appointment</h1>
        {isShowForm && (
          <form>
            <Input
              id='firstName'
              label='First name:'
              value={firstName}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <Input
              id='middleName'
              label='Middle name:'
              value={middleName}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <Input
              id='lastName'
              label='Last name:'
              value={lastName}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <TextArea
              id='comments'
              label='Comments:'
              value={comments}
              required
              onChange={this.handleOnchange.bind(this)}
            />
            <TimePicker
              id='startTime'
              selected={startTime}
              lable='Start time:'
              onChange={this.handleOnChangeStartTime.bind(this)}
              timeInterval={30}
            />
            <TimePicker
              id='endTime'
              selected={endTime}
              lable='End time:'
              onChange={this.handleOnChangeEndTime.bind(this)}
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
  state: state,
});
const mapDispatchToProps = dispatch => ({
  createAppointment: data => dispatch(createAppointment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
