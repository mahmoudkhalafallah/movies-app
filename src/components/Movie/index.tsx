import React from "react";

import { MovieTitle } from "../Titles";
import { MovieImage } from "./movie-image";
import { MovieRating } from "./movie-rating";
import styled from "styled-components/native";
import { StyledText } from "../Text";

const MovieContainer = styled.View`
flex-direction: ${({ horizontal }: any) => horizontal ? 'column' : 'row'};
justify-content: space-between;
align-items: ${({ horizontal }: any) => horizontal ? 'center' : 'flex-start'};
width: 100;
margin-top: 10;
margin-bottom: 10;
${({ horizontal, isFirst }: any) => (horizontal && isFirst) ? 'margin-left: 25' : 'margin-left: 10'}
${({ horizontal, isLast }: any) => (horizontal && isLast) ? 'margin-right: 20' : 'margin-right: 10'}
${({ horizontal }: any) => (!horizontal) && 'margin-left: 20'}
${({ horizontal, isLast }: any) => (!horizontal && isLast) && 'padding-bottom: 80'}
`

const MovieDetails = styled.View`
flex-direction: column;
width: ${({ horizontal }: any) => horizontal ? '100' : '150'};
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
    release_date, isFirst, isLast, horizontal }: any) => {
    return <MovieContainer isFirst={isFirst} isLast={isLast} horizontal={horizontal}>
        <MovieImage src={poster_path} horizontal={horizontal}></MovieImage>
        <MovieDetails horizontal={horizontal}>
            <MovieTitle ellipsizeMode='tail' numberOfLines={1}>{title}</MovieTitle>
            {(vote_average != undefined) && <MovieRating rating={vote_average} horizontal={horizontal} />}
            {!horizontal && <>
                <MovieDate>{release_date}</MovieDate>
                <MovieOverview ellipsizeMode='tail' numberOfLines={6}>{overview}</MovieOverview>
            </>}
        </MovieDetails>
    </MovieContainer>
}