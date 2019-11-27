import React, { useMemo } from 'react';
import { FlatList, ActivityIndicator, View, Dimensions } from "react-native";
import { Movie } from './Movie';
import { SectionTitle } from './Titles';
import { IMovie } from '../models/Movie';
import { StyledText } from './Text';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

const SectionHeader = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
width: ${windowWidth - 40};
align-self: center 
`

const NoMoviesText = styled(StyledText)`
align-self: center;
text-align: center;
color: #ccc;
width: ${windowWidth};
`

const LoaderContainer = styled.View`
height: 120;
width: '100%';
flex: 1;
flex-direction: column;
align-items: center;
align-content: center;
`

const Loader = () => <LoaderContainer>
    <ActivityIndicator size='large' />
</LoaderContainer>

const NoMovies = () => <>
    <NoMoviesText>No Movies</NoMoviesText>
</>

export const MoviesSection: React.FC<{
    items: IMovie[], isMyMovie?: boolean, loadMoreHandler?: (info: any) => void,
    loading?: boolean, AddMovieModal?: any
}> = (props) => {

    const {
        items, isMyMovie = false, loadMoreHandler,
        loading = false, AddMovieModal
    } = props
    const renderItem: React.FC<{ item: IMovie, index: number }> = ({ item, index }) => <Movie {...item} isFirst={index === 0} isLast={index === items.length - 1} isMyMovie={isMyMovie} />

    const LoadMore = useMemo(() => Loader(), [])

    return <>
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
            onEndReachedThreshold={1}
            ListFooterComponent={(items.length > 0 && loading) ? LoadMore : <></>}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            ListEmptyComponent={<NoMovies />}
        />
    </>
}