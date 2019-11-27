import 'react-native';
import React from 'react';
import { MovieImage } from '../src/components/Movie/movie-image';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Movie Image renders correctly with working source and isMyMovie flag set to true', () => {
    const rating = renderer.create(<MovieImage isMyMovie={true} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' />).toJSON();
    expect(rating).toMatchSnapshot();
});

it('Movie Image renders correctly with working source', () => {
    const rating = renderer.create(<MovieImage src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' />).toJSON();
    expect(rating).toMatchSnapshot();
});

it('Movie Image renders correctly with broken source', () => {
    const rating = renderer.create(<MovieImage src='https://broken-image-src.png' />).toJSON();
    expect(rating).toMatchSnapshot();
});

it('Movie Image renders correctly with no source', () => {
    const rating = renderer.create(<MovieImage />).toJSON();
    expect(rating).toMatchSnapshot();
});
