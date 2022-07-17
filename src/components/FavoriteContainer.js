import update from 'immutability-helper'
import { useCallback, useState, useEffect } from 'react'
import { FavoriteCard } from './FavoriteCard.js'
import { CardDemo } from './CardDemo'
import FavoriteDataService from '../services/favorites.js'

const style = {
    width: 400,
}
export const FavoriteContainer = ({
    user,
    favorites,
    favMovies
}) => {
    {

        // const [cards, setCards] = useState([
        //     {
        //         id: 1,
        //         text: 'Write a cool JS library',
        //       },
        //       {
        //         id: 2,
        //         text: 'Make it generic enough',
        //       },
        //       

        // ])

        console.log(favorites)
        // const [cards, setCards] = useState(favorites);
        // useEffect(() =>{
        //     setCards(favorites);
        // },[favorites])

        const [cards, setCards] = useState(favMovies);

        console.log(favMovies)

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
            return (


                <CardDemo
                key={card.id}
                index={index}
                //id={card.id}
                //text={card.text}
                text={card.title}
                moveCard={moveCard}
              />
                // <FavoriteCard
                //     key={card.id}
                //     index={index}
                //     id={card.id}
                //     poster={card.poster}
                //     title={card.title}
                //     moveCard={moveCard}
                // />
            )
        }, [])


        // useEffect(() => {
        //     setCards([])
        //     loadFavoritesCard();

        // }, [loadFavoritesCard]);


        return (
            <>
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
                
            </>
        )
    }
}

export default FavoriteContainer;
