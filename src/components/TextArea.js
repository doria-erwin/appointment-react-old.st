/** @format */

import React from 'react';

export default ({ id, label, value, className, required, onChange, name }) => (
  <div className='form-group'>
    <label htmlFor={id}>{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      className={`form-control form-control-sm ${className}`}
      required={required}
    />
  </div>
);
