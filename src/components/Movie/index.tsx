import React from "react";

import { MovieTitle } from "../Titles";
import { MovieImage } from "./movie-image";
import { MovieRating } from "./movie-rating";
import styled from "styled-components/native";
import { StyledText } from "../Text";
import { IMAGE_URI_PREFIX } from "../../utils/Constants";

const MovieContainer = styled.View`
flex-direction: ${({ isMyMovie }: any) => isMyMovie ? 'column' : 'row'};
justify-content: space-between;
align-items: ${({ isMyMovie }: any) => isMyMovie ? 'center' : 'flex-start'};
width: 100;
margin-top: 10;
margin-bottom: 10;
${({ isMyMovie, isFirst }: any) => (isMyMovie && isFirst) ? 'margin-left: 25' : 'margin-left: 10'}
${({ isMyMovie, isLast }: any) => (isMyMovie && isLast) ? 'margin-right: 20' : 'margin-right: 10'}
${({ isMyMovie }: any) => (!isMyMovie) && 'margin-left: 20'}
${({ isMyMovie, isLast }: any) => (!isMyMovie && isLast) && 'padding-bottom: 80'}
`

const MovieDetails = styled.View`
flex-direction: column;
`

const MovieOverview = styled(StyledText)`
font-size: 13;
font-family: 'Oswald-Light';
margin-top: 5;
`

const MovieDate = styled(StyledText)`
font-size: 10;
margin-top: 5;
`

export const Movie: React.FC<any> = ({ title, poster_path, vote_average, overview,
    release_date, isFirst, isLast, isMyMovie }: any) => {
    return <MovieContainer isFirst={isFirst} isLast={isLast} isMyMovie={isMyMovie}>
        <MovieImage src={isMyMovie ? poster_path : `${IMAGE_URI_PREFIX}${poster_path}`} isMyMovie={isMyMovie}></MovieImage>
        <MovieDetails style={{width: isMyMovie ? 100 : 150}}>
            <MovieTitle ellipsizeMode='tail' numberOfLines={1}>{title}</MovieTitle>
            {(vote_average != undefined) && <MovieRating rating={vote_average} showRatingValue={isMyMovie} />}
            {!isMyMovie && <>
                <MovieDate>{release_date}</MovieDate>
                <MovieOverview ellipsizeMode='tail' numberOfLines={6}>{overview}</MovieOverview>
            </>}
        </MovieDetails>
    </MovieContainer>
}