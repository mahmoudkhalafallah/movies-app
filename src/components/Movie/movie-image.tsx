import React, { useState } from "react";
import styled from "styled-components/native";

const imagePlaceholder = require('../../../assets/images/film-poster-placeholder.png')

const StyledImage = styled.Image`
width: ${({horizontal}: any) => horizontal? '100' : '150'};
height: ${({horizontal}: any) => horizontal? '100' : '200'};
margin-right: ${({horizontal}: any) => horizontal? '10' : '20'};
border-top-left-radius: 10;
border-top-right-radius: 10;
border-bottom-left-radius: 10;
border-bottom-right-radius: 10;
`

export const MovieImage: React.FC<{ horizontal: string, src?: string }> = ({ horizontal, src }) => {

    const [err, setErr] = useState(false)
    const source = (!err && src) ? { uri: src } : imagePlaceholder

    return <StyledImage
        source={source}
        horizontal={horizontal}
        onError={() => setErr(true)}
    />
}