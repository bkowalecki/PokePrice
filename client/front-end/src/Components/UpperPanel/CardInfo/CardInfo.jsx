
import { useState } from 'react';
import pokemon from 'pokemontcgsdk'
import './CardInfo.css'

const CardInfo = ({fetchedCard}) => {

    pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})


return(
    <div className='card-window'>
        <img
            className='card-img'
            style={{ animation: 'flash 1.5s .5s' }}
            src = {fetchedCard.img}
            alt="new"
        />
        
        <div className='info-chunk'>
            Price  = 
            {fetchedCard.price}
        </div>
        {/* <div>
            {fetchedCard.price}
        </div> */}
    </div>
)}

export default CardInfo