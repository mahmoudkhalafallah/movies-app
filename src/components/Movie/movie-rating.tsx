import React from "react";
import SwipeableRating from 'react-native-swipeable-rating';
import { Variables } from "../../utils/Variables";
import styled from "styled-components/native";
import { StyledText } from "../Text";


const RatingContainer = styled.View`
flex-direction: row;
align-items: center;
`

const RatingValue = styled(StyledText)`
font-size: 10;
color: #bbb;
`

export const MovieRating: React.FC<{ rating: number, horizontal: boolean }> = ({ rating, horizontal }) => {

    const ratingPerFiveStars = (rating / 10) * 5
    return <RatingContainer>
        <SwipeableRating
        color={Variables.ratingStarColor}
        emptyColor={Variables.ratingStarColor}
        rating={ratingPerFiveStars}
        size={15}
        gap={0.1}
        xOffset={20}
        allowHalves={true}
        swipeable={false}
    />
        {(!horizontal) && <RatingValue>{rating}/10</RatingValue>}
    </RatingContainer>
}
