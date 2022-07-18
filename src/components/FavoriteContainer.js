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
    loadFavMovies
}) => {
    {


        console.log("Favorite list in FavContainer")
        console.log(favorites)

        favMovies.sort((a, b) => favorites.indexOf(a._id) - favorites.indexOf(b._id));

        const [cards, setCards] = useState(favMovies);

        // loadFavMovies to re-render
        // useEffect(() => {
        //     setCards(favMovies);
        // }, [favorites, user, loadFavMovies])

        // when cards changed, update favorites order
        // useEffect(() =>{
        //     setCards(favorites);
        // },[cards])



        console.log("favMovies in FavContainer");
        console.log(favMovies)


        console.log("cards in FavContainer");
        console.log(cards)

        // // const loadFavoritesCard = useCallback(() => {
        // //     if (user) {

        // //         FavoriteDataService.GetFavoritesCards(user.googleId)
        // //             .then(response => {
        // //                 console.log(response)
        // //                 setCards(response.data)
        // //             })
        // //             .catch(e => {
        // //                 console.log(e);
        // //             });
        // //     }
        // // }, [user, favorites]);


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
            console.log(card);
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


        return (
            <>
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>

            </>
        )
    }
}

export default FavoriteContainer;
