import './App.css';
import React, { useState, useEffect } from 'react';
//import movies from './database/movies.json';




function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayMovies, setDisplayMovies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://www.omdbapi.com/?apikey=42dc6836&s=movie`)
      .then(response => response.json())
      .then(response => {
        setMovies(response.Search);
        setDisplayMovies(response.Search);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if(searchTerm) {
      setDisplayMovies(movies.filter(movie => movie.Title.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setDisplayMovies(movies);
    }
  }, [searchTerm, movies]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className='App'>
      <div className='header'>
        <h1>Movies</h1>
        </div>
        <input className = "search-box" type="text" placeholder="Search..." onChange={handleSearch} />
        <br></br>
        <br></br>
        <div className='movie-list'>
        {displayMovies.map(movie => (
          <div className='movies'>
            <div className='image-container'>
          <img src={movie.Poster} alt='movie'></img>
          </div>
          <h3>{movie.Title} ({movie.Year})</h3>
          <br></br>
        <br></br>
          </div>
        
        ))}
      </div>
    </div>

  );
};






/*
function App() {


  const [movies, setMovies] = useState([]);

  const [searchedMovie, setSearchedMovie] = useState('');
	const [favourites, setFavourites] = useState([]);

  const getsearchedMovie= async (searchedMovie) => {

		const response = await fetch(`http://www.omdbapi.com/?s=${searchedMovie}&apikey=42dc6836`);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
      console.log("responseJson.Search" + responseJson.Search);
		}
	};

 

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
	);

	if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);



  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};


  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  const resetInputField = () => {
    setSearchedMovie("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    getsearchedMovie(searchedMovie);
    resetInputField();
  }
  return (


    
    <div className="App">

      <div className='row'>
        <div className='header'>
          <h1>Movies</h1>
        </div>
      <div className='col'>
			    <form className='search-box'>
          <input
            className='search-movie'
            value={searchedMovie}
            onChange={(event) => setSearchedMovie(event.target.value)}
            placeholder='Search...'
			    ></input>
          <input onClick={callSearchFunction} type="submit" value="Search..."></input>

        </form>
		    </div>
			</div>

      <div className='movie-list'>

			{movies.map((movie, index) => (
				<div className='movies'>
					<h2>{movie.Title}</h2>
          <img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => addFavouriteMovie(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
					</div>
				</div>
			))}
          
         
			</div>

      {
        movies.map( m => {
          return(
            <div className='box' key={m.id}>
              <strong>{m.title}</strong><br></br>
              {m.description}<br></br>
            </div>
          )
        })
      }

  

      
    </div>
  )
}*/

export default App;
