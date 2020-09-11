/** @format */

import React from 'react';
import { MDBContainer, MDBAlert } from 'mdbreact';

export default ({ errors }) => {
  if (typeof errors === 'object') {
    return Object.keys(errors).map(key => {
      if (typeof errors[key] === 'object') {
        return Object.keys(errors[key]).map(key2 => (
          <MDBAlert color='danger' dismiss>
            <strong>{key2.toLowerCase()}</strong>{' '}
            {errors[key][key2][0].toLowerCase()}
          </MDBAlert>
        ));
      } else {
        return (
          <MDBAlert color='danger' dismiss>
            <strong>{key.toLowerCase()}</strong> {errors[key][0].toLowerCase()}
          </MDBAlert>
        );
      }
    });
  } else {
    return (
      <MDBAlert color='danger' dismiss>
        {errors}
      </MDBAlert>
    );
  }
};
