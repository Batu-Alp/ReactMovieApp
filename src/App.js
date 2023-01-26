import './App.css';
import React, { useState, useEffect } from 'react';
//import movies from './database/movies.json';

function App() {


  const [movies, setMovies] = useState([]);

  const [searchedMovie, setSearchedMovie] = useState('');
	const [favourites, setFavourites] = useState([]);

  const getsearchedMovie= async (searchedMovie) => {

    //const response = movies.filter(item => item.title === searchedMovie);
		const response = await fetch(`http://www.omdbapi.com/?s=${searchedMovie}&apikey=42dc6836`);
		const responseJson = await response.json();
    //setSearchedMovie(response);

		if (responseJson.Search) {
			setMovies(responseJson.Search);
      console.log("responseJson.Search" + responseJson.Search);
		}
	};

  /*useEffect(() => {
		getsearchedMovie(searchedMovie);
	}, [searchedMovie]);*/

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
	);

	if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);


  
  //const [favouriteMovies, setfavouriteMovies] = useState([]);
  
  /*
  useEffect( () => {
    fetch("./database/movies.json")
    .then((res) => res.json())
    .then((data) => setMovies(data[0]))

  }, []);
  */
  
  
  /*const getData = () => {
    fetch('./database/movies.json')
    .then(response => {
      return response.json();
    }).then(data => {
      setMovies(data[0]);
    });
  }

  useEffect(() => {
    getData()

  },[])*/

  //console.log("movies" , movies);

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
          <span class="imgtext">
            <h1>THIS IS A TITLE</h1>
            <p>and this is a description</p>
            </span>
					<div
						onClick={() => addFavouriteMovie(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
					</div>
				</div>
			))}
          
          {/*
            movies.map( m => (

              <div className='image-container d-flex justify-content-start m-3'>
					      <div
						      onClick={() => addFavouriteMovie(m)}
						      className='overlay d-flex align-items-center justify-content-center'
					        >
      
					</div>
				</div>
             
            ))
            */}
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

      {/*
      {
        movies && movies.length > 0 && movies.map((item) => <p>{item.title}</p>)
        
      } 
    */}
      
      {/*
      {movies && movies.map((m) => (
      <div key={m.id}>
        <p>{m.title}</p>
      </div>
      ))}
      */}

      
    </div>
  )
}

export default App;
