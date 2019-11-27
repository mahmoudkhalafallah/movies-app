import 'react-native'
import React from 'react'
import { IMovie } from '../src/models/Movie'
import { Movie } from '../src/components/Movie'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const MovieSample: IMovie = {
	poster_path:
		'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
	id: 475557,
	title: 'Joker',
	vote_average: 8.4,
	overview:
		'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.',
	release_date: '2019-10-02',
}

it('Movie renders when it is not of type "MyMovie"', () => {
	const rating = renderer
		.create(
			<Movie {...MovieSample} isMyMovie={false} isFirst={false} isLast={false} />,
		)
		.toJSON()
	expect(rating).toMatchSnapshot()
})

it('Movie renders correctly when it is of type "MyMovie"', () => {
	const rating = renderer
		.create(
			<Movie {...MovieSample} isMyMovie={true} isFirst={false} isLast={false} />,
		)
		.toJSON()
	expect(rating).toMatchSnapshot()
})

it('Movie renders correctly when it is of type "MyMovie" and is the first item in the list', () => {
	const rating = renderer
		.create(
			<Movie {...MovieSample} isMyMovie={true} isFirst={true} isLast={false} />,
		)
		.toJSON()
	expect(rating).toMatchSnapshot()
})

it('Movie renders correctly when it is of type "MyMovie" and is the last item in the list', () => {
	const rating = renderer
		.create(
			<Movie {...MovieSample} isMyMovie={true} isFirst={false} isLast={true} />,
		)
		.toJSON()
	expect(rating).toMatchSnapshot()
})
