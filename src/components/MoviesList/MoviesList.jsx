import { useLocation, Link } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import css from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      {movies.length !== 0 && (
        <ul className={css.moviesList}>
          {movies.map(({ id, title }) => {
            return (
              <li key={id}>
                <span className={css.icon}>
                  <BiCameraMovie />
                </span>
                <Link to={`/movies/${id}/cast`} state={{ from: location }}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MoviesList;
