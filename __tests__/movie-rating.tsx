import 'react-native';
import React from 'react';
import { MovieRating } from '../src/components/Movie/movie-rating';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('rating renders correctly', () => {
  const rating = renderer.create(<MovieRating rating={5} />).toJSON();
  expect(rating).toMatchSnapshot();
});
