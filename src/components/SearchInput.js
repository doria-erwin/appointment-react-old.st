/** @format */

import React from 'react';

export default props => (
  <input
    {...props}
    id='searchInput'
    placeholder='Search patient'
    className='form-control form-control-sm ml-auto mt-2'
  />
);
