/** @format */

import React from 'react';

export default props => (
  <input
    {...props}
    id='searchInput'
    name='search'
    placeholder='Search patient'
    className='form-control form-control-sm ml-auto mt-2'
  />
);
