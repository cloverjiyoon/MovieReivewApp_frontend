import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import AddReview from './components/AddReview';
import './App.css';

import { useState, useEffect, useCallback } from 'react';
import Login from "./components/Login";
import Logout from "./components/Logout";

import FavoriteDataService from "./services/favorites";
import FavoritePage from "./components/FavoritesPage";
import MovieDataService from './services/movies';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [doFaves, setDoFaves] = useState(false);   // check favorite has any updates
  const [favMovies, setFavMovies] = useState([]);  // id, poster, title.
  const [carddata, setCarddata] = useState(null);

  // const [cards, setCards] = useState();

  const addFavorite = (movieId) => {    // *********ADD title and poster information here

    setDoFaves(true);   // everytime when there's any change on onClick, doFaves became True
    setFavorites([...favorites, movieId])
  }

  const deleteFavorite = (movieId) => {
    setDoFaves(true);    // everytime when there's any change on onClick, doFaves became True
    setFavorites(favorites.filter(f => f !== movieId));
  }

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now() / 1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);


  const loadFavorites = useCallback(() => {
    if (user) {

      FavoriteDataService.getFavorites(user.googleId)
        .then(response => {
          console.log(response)
          setFavorites(response.data.favorites)
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [user]);



  const saveFavorites = useCallback(() => {

    if (user && doFaves) {

      var data = {
        _id: user.googleId,
        favorites: favorites

      }

      FavoriteDataService.updateFavorites(data)

        // .then(response => {
        //   console.log(response)
        //   setFavorites(response.data)
        // })
        .catch(e => {
          console.log(e);
        });
    }
  }, [user, favorites]);



  // HW 8 

  const loadFavMovies = useCallback(() => {
    setFavMovies([])
    console.log("favorites in loadFavMovies");
    console.log(favorites);

    const getFavMovieList = id => {
      MovieDataService.get(id)
        .then(response => {
          var carddata = {
            _id: id,
            poster: response.data.poster,
            title: response.data.title

          }

          setCarddata(carddata);
          console.log(carddata);

          // setFavMovies([...favMovies, carddata]);

          // setFavMovies([...favMovies, response.data]);

          console.log(response.data);
          // console.log(favMovies);
        })
        .catch(e => {
          console.log(e);
        });
    };


    if (user && favorites) {

      favorites.map(async (movie_Id) => {
        // get each movie info by ID
        getFavMovieList(movie_Id)

      })


    }
  }, [user, favorites]);




  useEffect(() => {
    setFavorites([])
    loadFavorites();

  }, [loadFavorites]);

  useEffect(() => {
    saveFavorites();
    setDoFaves(false);    // after we handle changes, set doFaves False
  }, [saveFavorites]);


  // HW8
  useEffect(() => {
    loadFavMovies();
    console.log(favMovies);
    // setFavMovies(favMovies.sort((a, b) => a._id.localeCompare(b._id)));
  }, [loadFavMovies]);

  useEffect(() => {
    console.log("Favorite Movie list is now");
    if (carddata) {
      setFavMovies([...favMovies, carddata]);
    }
    console.log(favMovies);
  }, [carddata]);

  // favMovies.sort((a, b) => favorites.indexOf(a) - favorites.indexOf(b));


  return (

    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
          <Container className="container-fluid">
            <Navbar.Brand className="brand" href="/">
              <img src="/images/movies-logo.png" alt="movies logo" className="moviesLogo" />
              MOVIE TIME
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="ml-auto">
                <Nav.Link as={Link} to={"/movies"}>
                  Movies
                </Nav.Link>
                {user && <Nav.Link as={Link} to={"/favorites"}>
                  Favorites
                </Nav.Link>}
              </Nav>
            </Navbar.Collapse>
            {user ? (
              <Logout setUser={setUser} />
            ) : (
              <Login setUser={setUser} />
            )}
          </Container>
        </Navbar>

        <Routes>
          <Route exact path={"/"} element={
            <MoviesList
              user={user}
              addFavorite={addFavorite}
              deleteFavorite={deleteFavorite}
              favorites={favorites}
            />}
          />
          <Route exact path={"/movies"} element={
            <MoviesList
              user={user}
              addFavorite={addFavorite}
              deleteFavorite={deleteFavorite}
              favorites={favorites}
            />}
          />
          <Route exact path={"/movies/:id"} element={
            <Movie user={user} />}
          />
          <Route exact path={"/movies/:id/review"} element={
            <AddReview user={user} />}
          />

          <Route exact path={"/favorites"} element={
            <FavoritePage
              user={user}
              favorites={favorites}
              favMovies={favMovies}
            />}
          />

        </Routes>
      </div>
    </GoogleOAuthProvider>
  );

}

export default App;
