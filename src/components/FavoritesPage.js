import React, { useEffect, useState } from 'react'
import './Favorites.css';
import FavoriteDataService from "../services/favorites";
import { Container } from 'react-bootstrap';

// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import {useDrag, useDrop } from 'react-dnd';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FavoriteContainer from './FavoriteContainer';



const FavoritePage = ({
    user,
    favorites,
    favMovies,
    loadFavMovies
}) => {


    return (
        <div className="App">
            <Container className="favoritesContainer">
                {favorites.length === 0 ? (
                    <div className="favoritesPanel"> You haven't chosen any favorites yet</div>

                ) : (
                    <div className="favoritesPanel"> Drag your favorites to rank them</div>
                )}

                <div style={{ width: "500px", margin: "1em" }}>
                    <DndProvider backend={HTML5Backend}>
                        <FavoriteContainer
                            user={user}
                            favorites={favorites}
                            favMovies = {favMovies}
                            loadFavMovies = {loadFavMovies}
                        />
                    </DndProvider>
                </div>
            </Container>
        </div>
    )
}

export default FavoritePage;