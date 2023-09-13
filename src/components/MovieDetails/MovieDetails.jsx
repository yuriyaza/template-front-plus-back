import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useLocation, Link, NavLink, Outlet } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import Spinner from 'components/Spinner/Spinner';
import * as api from '../../services/apiService';
import css from './MovieDetails.module.css';

const MovieDetails = ({ isLoading }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const { title, poster_path, overview, genres, release_date, vote_average } = movie;
  const releaseDate = new Date(release_date).getFullYear();

  const location = useLocation();
  const backLinkURL = useRef(location.state ? location.state.from : '/');

  useEffect(() => {
    async function getData() {
      try {
        isLoading(true);
        const response = await api.getMovieDetails(movieId);
        setMovie(response.data);
      } finally {
        isLoading(false);
      }
    }
    getData();
  }, [movieId, isLoading]);

  return (
    Object.entries(movie).length !== 0 && (
      <>
        <div className={css.wrapper}>
          <div className={css.poster}>
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} />
          </div>
          <div className={css.details}>
            <h2>{`${title} (${releaseDate})`}</h2>
            <p className={css.description}>User Score: {vote_average} </p>
            <h3>Overview</h3>
            <p className={css.description}>{overview}</p>
            <h3>Genres</h3>
            <p className={`${css.description} ${css.last}`}>{genres.map(genre => genre.name).join(', ')}</p>
            <Link className={css.backLink} to={backLinkURL.current}>
              <TiArrowBackOutline className={css.icon} size={15} />
              Back
            </Link>
          </div>
        </div>

        <div className={css.tabs}>
          <NavLink to='cast'>Cast</NavLink>
          <NavLink to='reviews'>Reviews</NavLink>
        </div>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </>
    )
  );
};

export default MovieDetails;
