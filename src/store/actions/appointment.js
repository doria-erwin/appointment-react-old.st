/** @format */

import {
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
} from './actionTypes';

import API from '../../constant/API';
import axios from 'axios';

export const createAppointment = data => dispatch => {
  dispatch({ type: CREATE_APPOINTMENT_REQUEST });
  axios
    .post(`${API}/appointment`, data)
    .then(res => {
      dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: CREATE_APPOINTMENT_FAILURE,
        payload: err,
      });
    });
};
