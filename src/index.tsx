import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import Api from "./utils/Api";
import { IMovie } from "./models/Movie";
import { AxiosResponse } from "axios";
import { MoviesSection } from "./components/MoviesSection";

const MyApp: React.FC = () => {
    const [movies, setMovies]: [IMovie[], Dispatch<SetStateAction<any>>] = useState([])
    const [myMovies, setMyMovies]: [IMovie[], Dispatch<SetStateAction<any>>] = useState([])

    useEffect(() => {
        Api.get('discover/movie').then((res: AxiosResponse<{ results: IMovie[] }>) => {
            setMovies(res.data.results)
        })
    }, [])
    return <SafeAreaView>
        <MoviesSection title='My Movies' items={movies} horizontal={true} height={150} />
        <MoviesSection title='All Movies' items={movies} height={320}/>
    </SafeAreaView>
}

export default MyApp