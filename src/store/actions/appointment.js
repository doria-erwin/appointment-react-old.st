/** @format */

import {
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  GET_APPOINTMENT_REQUEST,
  GET_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_FAILURE,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAILURE,
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
      dispatch({
        type: CREATE_APPOINTMENT_FAILURE,
        payload: get(err, 'response.data.data.errors', {}),
      });
    });
};

export const showAllAppointments = (data = '') => dispatch => {
  dispatch({ type: GET_APPOINTMENT_REQUEST });
  axios
    .get(`${API}/appointments${data}`)
    .then(res => {
      dispatch({ type: GET_APPOINTMENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({
        type: GET_APPOINTMENT_FAILURE,
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
      dispatch({
        type: DELETE_APPOINTMENT_FAILURE,
        payload: get(err, 'response.data.data.errors', {}),
      });
    });
};
