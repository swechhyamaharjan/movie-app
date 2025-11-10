import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` //verifies who is trying to make a req
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS); //fetch allows https req i.e get,post to apis or server
      if (!response.ok) {
        throw new Error(`Error failed to fetch movies`)
      }
      const data = await response.json();
      
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([]);
        return;
      }
      
      setMovieList(data.results || []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again!!`)
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
     fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'all enjoy without hassle.</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>


        <section className='all-movies'>
          <h2 className='mt-20'>All Movies</h2>

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie)=>(
                <p key={movie.id} className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}

        </section>
      </div>
    </main>
  )
}

export default App 
