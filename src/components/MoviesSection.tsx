import React, { useMemo } from 'react';
import { FlatList, ActivityIndicator, View, Dimensions } from "react-native";
import { Movie } from './Movie';
import { SectionTitle } from './Titles';
import { IMovie } from '../models/Movie';
import { StyledText } from './Text';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

const Loader = () => <View style={{ height: 120, width: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
    <ActivityIndicator size='large' />
</View>

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

const NoMovies = () => <>
    <NoMoviesText>No Movies</NoMoviesText>
</>

export const MoviesSection: React.FC<{
    title: string, items: IMovie[], horizontal?: boolean, height?: number, loadMoreHandler?: (info: any) => void,
    loading?: boolean, AddMovieModal?: any
}> = ({
    title, items, horizontal = false, height, loading = false, loadMoreHandler = (info: any) => { }, AddMovieModal
}) => {
        const renderItem: React.FC<{ item: IMovie, index: number }> = ({ item, index }) => <Movie {...item} isFirst={index === 0} isLast={index === items.length - 1} horizontal={horizontal} />

        const LoadMore = useMemo(() => Loader(), [])

        return <>
            <SectionHeader>
                <SectionTitle>{title}</SectionTitle>
                {AddMovieModal && AddMovieModal()}
            </SectionHeader>
            <FlatList
                style={{ height }}
                data={items}
                keyExtractor={(item: IMovie) => item.id.toString()}
                renderItem={renderItem}
                horizontal={horizontal}
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