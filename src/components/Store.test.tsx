import React from 'react';
import Store from './Store';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Store />)
});
