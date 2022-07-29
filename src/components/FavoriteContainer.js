import update from 'immutability-helper'
import { useCallback, useState, useEffect } from 'react'
import { CardDemo } from './CardDemo'
import FavoriteDataService from '../services/favorites.js'

const style = {
    width: 400,
}
export const FavoriteContainer = ({
    user,
    favorites,
    favMovies,
    setFavoritesInApp
}) => {
    {


        console.log("favoties (movie id list) in FavContainer")
        console.log(favorites)

        favMovies.sort((a, b) => favorites.indexOf(a._id) - favorites.indexOf(b._id));
        console.log("favMovies sorted");

        console.log("favMovies in FavContainer");
        console.log(favMovies)

        debugger
        const [cards, setCards] = useState(favMovies);

        console.log("cards in FavContainer");
        console.log(cards)


        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex]],
                    ],
                }),
            )
        }, [])

        const renderCard = useCallback((card, index) => {
            console.log(card._id);
            return (

                <CardDemo
                    key={card._id}
                    index={index}
                    id={card._id}
                    poster={card.poster ? card.poster : "/images/NoPosterAvailable.jpeg"}
                    title={card.title}
                    moveCard={moveCard}
                />

            )
        }, [])
        
        // when cards changed, update favorites order
        useEffect(() => {
            if (user && cards) {
                console.log("user in useEffect")
                console.log(user);
                let sortStandard = cards.map(a => a._id);

                // extrating ._id field to sort
                favorites.sort((a, b) => sortStandard.indexOf(a) - sortStandard.indexOf(b));

                var data = {
                    _id: user.googleId,
                    favorites: favorites
        
                }
                // FavoriteDataService.updateFavorites(data);
                debugger
                setFavoritesInApp(favorites, data);
                debugger
                console.log(favorites);
                
                
            }
        }, [cards, favorites])


        useEffect(() => {
        
            setCards(favMovies);
            console.log(cards);

        }, [cards])



        return (
            <>
                <div style={style}>
                    {cards.map((card, i) => renderCard(card, i))}
                </div>

            </>
        )
    }
}

export default FavoriteContainer;
