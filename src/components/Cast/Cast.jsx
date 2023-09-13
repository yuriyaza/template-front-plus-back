import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DiRedhat } from 'react-icons/di';
import * as api from '../../services/apiService';
import css from './Cast.module.css';

const Cast = ({ isLoading }) => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        isLoading(true);
        const response = await api.getMovieCast(movieId);
        setCast(response.data.cast);
      } finally {
        isLoading(false);
      }
    }
    getData();
  }, [movieId, isLoading]);

  return (
    <ul className={css.castList}>
      {cast.map(({ id, name, profile_path, character }) => {
        return (
          <li className={css.castItem} key={id}>
            <div className={css.photo}>
              {profile_path ? (
                <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt={name} />
              ) : (
                <DiRedhat size={100} />
              )}
            </div>
            <p>{name}</p>
            <p className={css.character}>Character: {character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
