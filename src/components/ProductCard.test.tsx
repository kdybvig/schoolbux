import React from 'react';
import ReactDOM from 'react-dom';
import ProductCard from './ProductCard';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ProductCard imgSrc='' title='' />)
});
