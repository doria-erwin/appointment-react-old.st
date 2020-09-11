/** @format */

import React from 'react';
import PickerCustomInput from './PickerCustomInput';
import DatePicker from 'react-datepicker';

export default ({ id, label, onChange, filterDate, minDate, selected }) => (
  <div className='form-group'>
    <label htmlFor={id}>{label}</label>
    <DatePicker
      onChange={onChange}
      selected={selected}
      filterDate={filterDate}
      minDate={minDate}
      customInput={<PickerCustomInput />}
    />
  </div>
);
