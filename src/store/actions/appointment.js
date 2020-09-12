/** @format */

import {
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  GET_ALL_APPOINTMENT_REQUEST,
  GET_ALL_APPOINTMENT_SUCCESS,
  GET_ALL_APPOINTMENT_FAILURE,
  GET_APPOINTMENT_REQUEST,
  GET_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_FAILURE,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAILURE,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILURE,
} from './actionTypes';

import API from '../../constant/API';
import axios from 'axios';
import { get } from 'lodash';

export const createAppointment = data => dispatch => {
  dispatch({ type: CREATE_APPOINTMENT_REQUEST });
  axios
    .post(`${API}/appointment`, data)
    .then(res => {
      dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      if (err.message === 'Network Error')
        alert('Please check your API if running...');
      dispatch({
        type: CREATE_APPOINTMENT_FAILURE,
        payload: get(err, 'response.data.data.errors', {}),
      });
    });
};

export const showAllAppointments = (data = '') => dispatch => {
  dispatch({ type: GET_ALL_APPOINTMENT_REQUEST });
  axios
    .get(`${API}/appointments${data}`)
    .then(res => {
      dispatch({ type: GET_ALL_APPOINTMENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      if (err.message === 'Network Error')
        alert('Please check your API if running...');
      dispatch({
        type: GET_ALL_APPOINTMENT_FAILURE,
        payload: get(err, 'response.data.data.errors', {}),
      });
    });
};

export const deleteAppointment = data => dispatch => {
  dispatch({ type: DELETE_APPOINTMENT_REQUEST });
  axios
    .delete(`${API}/appointment/${data}`)
    .then(res => {
      dispatch({ type: DELETE_APPOINTMENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      if (err.message === 'Network Error')
        alert('Please check your API if running...');
      dispatch({
        type: DELETE_APPOINTMENT_FAILURE,
        payload: get(err, 'response.data.data.errors', {}),
      });
    });
};

export const showAppointmentById = data => dispatch => {
  dispatch({ type: GET_APPOINTMENT_REQUEST });
  axios
    .get(`${API}/appointment/${data}`)
    .then(res => {
      dispatch({ type: GET_APPOINTMENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      if (err.message === 'Network Error')
        alert('Please check your API if running...');
      dispatch({
        type: GET_APPOINTMENT_FAILURE,
        payload: get(err, 'response.data.data.errors', {}),
      });
    });
};

export const updateAppointment = data => dispatch => {
  dispatch({ type: UPDATE_APPOINTMENT_REQUEST });
  const { id } = data;
  delete data.id;
  axios
    .put(`${API}/appointment/${id}`, data)
    .then(res => {
      dispatch({ type: UPDATE_APPOINTMENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      if (err.message === 'Network Error')
        alert('Please check your API if running...');
      dispatch({
        type: UPDATE_APPOINTMENT_FAILURE,
        payload: get(err, 'response.data.data.errors', {}),
      });
    });
};

export const resetAppointment = () => dispatch => {
  dispatch({ type: GET_APPOINTMENT_SUCCESS, payload: null });
};
