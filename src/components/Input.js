/** @format */

import React from 'react';

export default ({ id, label, value, className, required, onChange }) => (
  <div className='form-group'>
    <label htmlFor={id}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      type='text'
      id={id}
      className={`form-control form-control-sm ${className}`}
      required={required}
    />
  </div>
);
