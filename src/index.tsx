import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { SafeAreaView, ScrollView, View, Text, Button } from "react-native";
import Api from "./utils/Api";
import { IMovie } from "./models/Movie";
import { AxiosResponse } from "axios";
import { MoviesSection } from "./components/MoviesSection";

const MyApp: React.FC = () => {
    const [movies, setMovies]: [{data:IMovie[], loading: boolean}, Dispatch<SetStateAction<any>>] = useState({data: [], loading: false})
    const [moviesPg, setMoviesPg]: [number, Dispatch<SetStateAction<any>>] = useState(1)

    const [myMovies, setMyMovies]: [IMovie[], Dispatch<SetStateAction<any>>] = useState([])

    useEffect(() => {
        Api.get('discover/movie', { page: moviesPg }).then((res: AxiosResponse<{ results: IMovie[] }>) => {
            setMovies({data: [...movies.data, ...res.data.results], loading: false});
        }, err => {
            setMovies({data: movies.data, loading: false});
        })
    }, [moviesPg])

    const allMoviesLoadMoreHandler = (info: any) => {
        if(!movies.loading) {
            setMovies({data: movies.data, loading: true});
            setMoviesPg(moviesPg + 1)
        }
    }

    const addMovie = () => {}

    return <SafeAreaView>
        <MoviesSection title='My Movies' items={[]} horizontal={true} height={150} addMovie={addMovie} />
        <MoviesSection title='All Movies' items={movies.data} loadMoreHandler={allMoviesLoadMoreHandler} height={320} loading={movies.loading} />
    </SafeAreaView>
}

export default MyApp