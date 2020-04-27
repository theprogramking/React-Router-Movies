import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Router, Route, Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { id, url } = useRouteMatch();

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies/:movieId')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route path="/movies/:movieId">
        <Movie />
      </Route>
    </div>
  );
};

export default App;
