import React, { useMemo, useCallback } from 'react'
import { FlatList, ActivityIndicator, View, Dimensions } from 'react-native'
import { Movie } from './Movie'
import { SectionTitle } from './Titles'
import { IMovie } from '../models/Movie'
import { StyledText } from './Text'
import styled from 'styled-components/native'

const windowWidth = Dimensions.get('window').width

const SectionHeader = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: ${windowWidth - 40};
	align-self: center;
`

const NoMoviesText = styled(StyledText)`
	align-self: center;
	text-align: center;
	color: #ccc;
	width: ${windowWidth};
`

const Loader = () => (
	<ActivityIndicator size="large" style={{ marginBottom: 25 }} />
)

const NoMovies = () => <NoMoviesText>No Movies</NoMoviesText>

const renderMovie: React.FC<{
	item: IMovie
	index: number
	items: IMovie[]
	isMyMovie: boolean
}> = ({ item, index, items, isMyMovie }: any) => (
	<Movie
		{...item}
		isFirst={index === 0}
		isLast={index === items.length - 1}
		isMyMovie={isMyMovie}
	/>
)

export const MoviesSection: React.FC<{
	items: IMovie[]
	isMyMovie?: boolean
	loadMoreHandler?: (info: any) => void
	AddMovieModal?: () => Element
}> = ({ items, isMyMovie = false, loadMoreHandler, AddMovieModal }) => {
	const renderItem = useCallback(
		({ item, index }) => renderMovie({ item, index, items, isMyMovie }),
		[isMyMovie, items],
	)

	const LoadMore = useMemo(() => Loader(), [])

	return (
		<>
			<SectionHeader>
				<SectionTitle>{isMyMovie ? 'My Movies' : 'All Movies'}</SectionTitle>
				{AddMovieModal && AddMovieModal()}
			</SectionHeader>
			<FlatList
				style={{ height: isMyMovie ? 150 : 320 }}
				data={items}
				keyExtractor={(item: IMovie) => item.id.toString()}
				renderItem={renderItem}
				horizontal={isMyMovie}
				onEndReached={loadMoreHandler}
				onEndReachedThreshold={2}
				ListFooterComponent={items.length > 0 ? LoadMore : <></>}
				removeClippedSubviews={true}
				maxToRenderPerBatch={20}
				initialNumToRender={20}
				ListEmptyComponent={<NoMovies />}
			/>
		</>
	)
}
