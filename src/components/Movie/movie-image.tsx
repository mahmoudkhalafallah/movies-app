import React, { useState } from "react";
import styled from "styled-components/native";
import { IMAGE_URI_PREFIX } from "../../utils/Constants";

const imagePlaceholder = require('../../../assets/images/film-poster-placeholder.png')

const StyledImage = styled.Image`
width: ${(props) => props.horizontal? '100' : '150'};
height: ${(props) => props.horizontal? '100' : '200'};
margin-right: ${(props) => props.horizontal? '10' : '20'};
border-top-left-radius: 10;
border-top-right-radius: 10;
border-bottom-left-radius: 10;
border-bottom-right-radius: 10;
`

export const MovieImage: React.FC<{ horizontal: string, src?: string }> = ({ horizontal, src }) => {

    const [err, setErr] = useState(false)
    const source = (!err && src) ? { uri: `${IMAGE_URI_PREFIX}${src}` } : imagePlaceholder

    return <StyledImage
        source={source}
        horizontal={horizontal}
        onError={() => setErr(true)}
    />
}