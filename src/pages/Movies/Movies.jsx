import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Notify } from 'notiflix';
import { BiSearchAlt } from 'react-icons/bi';
import MoviesList from 'components/MoviesList/MoviesList';
import * as api from '../../services/apiService';
import css from './Movies.module.css';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

const Movies = ({ isLoading }) => {
  const [urlParams, setUrlParams] = useSearchParams({});
  const query = urlParams.get('search');

  const [queryString, setQueryString] = useState(query ? query : '');
  const [moviesList, setMoviesList] = useState([]);

  function onInputChange(e) {
    setQueryString(e.target.value);
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    setUrlParams(queryString.trim() !== '' ? { search: queryString } : {});

    if (queryString.trim() === '') {
      Notify.warning('Please enter movie title to search');
      setMoviesList([]);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        if (!query) return;

        isLoading(true);
        const response = await api.searchMovies(query);
        setMoviesList(response.data.results);

        if (response.data.results.length === 0) Notify.failure('Sorry, this movie not found');
      } finally {
        isLoading(false);
      }
    }
    getData();
  }, [query, isLoading]);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input className={css.input} type='text' value={queryString} onChange={onInputChange} />
        <button className={css.searchButton} type='submit'>
          <BiSearchAlt size={20} color={'#ffffff'} />
        </button>
      </form>

      <MoviesList movies={moviesList} />
    </>
  );
};

export default Movies;
