import React from 'react';
import Unauthorized from './Unauthorized';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Unauthorized />)
});
