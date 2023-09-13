import { useState, useEffect } from 'react';
import MoviesList from 'components/MoviesList/MoviesList';
import * as api from '../../services/apiService';
import css from './Home.module.css';

const Home = ({ isLoading }) => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        isLoading(true);
        const result = await api.getTrending();
        setMoviesList(result.data.results);
      } finally {
        isLoading(false);
      }
    }
    getData();
  }, [isLoading]);

  return (
    <>
      <h1 className={css.title}>Trending movies</h1>
      <MoviesList movies={moviesList} />
    </>
  );
};

export default Home;
