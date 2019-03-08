import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Navigation />)
});
