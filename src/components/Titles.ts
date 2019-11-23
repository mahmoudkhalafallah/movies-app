import styled from 'styled-components/native'
import { Variables } from '../utils/Variables'
import { StyledText } from './Text'


export const SectionTitle = styled(StyledText)`
font-size: ${Variables.sectionTitleFontSize};
color: ${Variables.sectionTitleColor};
padding-bottom: 10;

`
export const MovieTitle = styled(StyledText)`
font-size: ${Variables.movieTitleFontSize};
color: ${Variables.movieTitleColor};
margin-bottom: 3;
`

