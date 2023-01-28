import './App.css';
import React, { useState, useEffect } from 'react';
//import movies from './database/movies.json';




function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayMovies, setDisplayMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://www.omdbapi.com/?apikey=42dc6836&s=all`)
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

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('favourites')
		);

		setFavourites(movieFavourites);
	}, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  function  addFavouriteMovie(movie) {
    
    var new_arr;
    if (favourites.includes(movie)) {
      new_arr = favourites.filter(function(e) { return e !== movie });
      setFavourites(new_arr)
    }

    else {
      new_arr = [...favourites, movie];
      setFavourites(new_arr);

    }
    console.log(movie);
    saveToLocalStorage(new_arr);


	};

  const saveToLocalStorage = (items) => {
		localStorage.setItem('favourites', JSON.stringify(items));
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
        <h1>Movie App</h1>
        </div>
        <input className = "search-box" type="text" placeholder="Search..." onChange={handleSearch} />
        <br></br>
        <br></br>
        <div className='movie-list'>
        {displayMovies.map((movie, index)=> (
          <div className='movies'>
            <div className='image-container'>
          <img src={movie.Poster} className= {movie.Title} alt='movie' onClick={() => addFavouriteMovie(movie.Title)}></img>
          <div className='image-text'>
            {movie.Type}</div>
          </div>
       
          <div className='movie-title'>
          <h3 >{movie.Title} ({movie.Year})</h3>
          </div>
       
          {favourites.includes(movie.Title) && <p>Added to favorites</p>}


          {/*<div className='fav-btn' onClick={() => addFavouriteMovie(movie)}>
            Fav
					</div>    
        */}
     
          <br></br>
        <br></br>
          </div>
        
        ))}

        
        
      </div>
  
         {  /*
     
          favourites.includes(onclick) && <p>Added to favorites</p>
      */}
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
