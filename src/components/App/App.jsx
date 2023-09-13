import { useState, lazy, Suspense } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Spinner from 'components/Spinner/Spinner';
import css from './App.module.css';

const Home = lazy(() => import('../../pages/Home/Home'));
const Movies = lazy(() => import('../../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../../components/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));
const NotFound = lazy(() => import('../../components/NotFound/NotFound'));

const App = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <>
      <header className={css.header}>
        <nav className={css.navigation}>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/movies'>Movies</NavLink>
        </nav>
      </header>

      <main>
        <section className={css.section}>
          <div className={css.container}>
            <Suspense fallback={<Spinner/>}>
              <Routes>
                <Route path='/' element={<Home isLoading={setShowSpinner} />} />
                <Route path='/movies' element={<Movies isLoading={setShowSpinner} />} />

                <Route path='/movies/:movieId' element={<MovieDetails isLoading={setShowSpinner} />}>
                  <Route path='/movies/:movieId/cast' element={<Cast isLoading={setShowSpinner} />} />
                  <Route path='/movies/:movieId/reviews' element={<Reviews isLoading={setShowSpinner} />} />
                </Route>

                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </section>

        {showSpinner && <Spinner />}
      </main>
    </>
  );
};

export default App;
