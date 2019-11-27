import React, {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
	useCallback,
} from 'react'
import { SafeAreaView } from 'react-native'
import Api from './utils/Api'
import { IMovie } from './models/Movie'
import { AxiosResponse } from 'axios'
import { MoviesSection } from './components/MoviesSection'
import { AddMovieModal } from './screens/AddMovie/AddMovieModal'

const MyApp: React.FC = () => {
	const [movies, setMovies]: [
		{ data: IMovie[]; loading: boolean },
		Dispatch<SetStateAction<any>>,
	] = useState({ data: [], loading: false })

	const [moviesPg, setMoviesPg]: [
		number,
		Dispatch<SetStateAction<any>>,
	] = useState(1)

	const [myMovies, setMyMovies]: [
		IMovie[],
		Dispatch<SetStateAction<any>>,
	] = useState([])

	const getMovies = useCallback(async () => {
		try {
			const res: AxiosResponse<{
				results: IMovie[]
			}> = await Api.get('discover/movie', { page: moviesPg })
			setMovies({
				data: [...movies.data, ...res.data.results],
				loading: false,
			})
		} catch (error) {
			setMovies({ data: movies.data, loading: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moviesPg])

	useEffect(() => {
		getMovies()
	}, [getMovies, moviesPg])

	const allMoviesLoadMoreHandler = () => {
		if (!movies.loading) {
			setMovies({ data: movies.data, loading: true })
			setMoviesPg(moviesPg + 1)
		}
	}

	const addMovie = (movie: IMovie) => {
		movie.id = myMovies.length + 1
		setMyMovies([...myMovies, movie])
	}

	const AddMovieModalTrigger = () => <AddMovieModal onSubmit={addMovie} />

	return (
		<SafeAreaView>
			<MoviesSection
				items={myMovies}
				isMyMovie={true}
				AddMovieModal={AddMovieModalTrigger}
			/>
			<MoviesSection
				items={movies.data}
				loadMoreHandler={allMoviesLoadMoreHandler}
			/>
		</SafeAreaView>
	)
}

export default MyApp
