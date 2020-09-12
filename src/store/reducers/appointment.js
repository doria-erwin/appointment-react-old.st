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
} from '../actions/actionTypes';

const initState = {
  isLoading: false,
  appointment: null,
  appointments: null,
  errors: null,
  hasError: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case CREATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null,
        hasError: false,
      };
    case CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        appointment: action.payload,
      };
    case CREATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errors: action.payload,
      };
    case GET_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null,
        hasError: false,
      };
    case GET_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        appointments: action.payload,
      };
    case GET_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errors: action.payload,
      };
    case DELETE_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null,
        hasError: false,
      };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        appointment: action.payload,
      };
    case DELETE_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errors: action.payload,
      };
    default:
      return state;
  }
}
