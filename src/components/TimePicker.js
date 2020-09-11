/** @format */
import React from 'react';
import DatePicker from 'react-datepicker';
import PickerCustomInput from './PickerCustomInput';

export default ({ id, lable, selected, onChange, timeInterval }) => (
  <div className={`form-group form-group-${id}`}>
    <label htmlFor={id}>{lable}</label>
    <DatePicker
      selected={selected}
      onChange={onChange}
      id={id}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={timeInterval}
      timeCaption='Time'
      dateFormat='h:mm aa'
      customInput={<PickerCustomInput />}
    />
  </div>
);
