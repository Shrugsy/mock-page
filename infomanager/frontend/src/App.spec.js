import React from 'react';
import { shallow } from '../setupEnzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});