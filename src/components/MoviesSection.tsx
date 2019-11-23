import React from 'react';
import { FlatList } from "react-native";
import { Movie } from './Movie';
import { SectionTitle } from './Titles';
import { IMovie } from '../models/Movie';

export const MoviesSection = ({
    title, items, horizontal = false, height
}: {
    title: string, items: IMovie[], horizontal?: boolean, height?: number
}) => <>
        <SectionTitle>{title}</SectionTitle>
        <FlatList
            style={{ height, marginBottom: 20 }}
            data={items}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item, index }) => <Movie {...item} isFirst={index === 0} isLast={index === items.length - 1} horizontal={horizontal} />}
            horizontal={horizontal}
        />
    </>
