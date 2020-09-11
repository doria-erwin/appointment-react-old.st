/** @format */

import {
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
} from '../actions/actionTypes';

const initState = {
  isLoading: false,
  appointment: null,
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
    default:
      return state;
  }
}
