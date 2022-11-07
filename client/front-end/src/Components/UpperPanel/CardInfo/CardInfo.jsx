
import { useState } from 'react';
import pokemon from 'pokemontcgsdk'
import './CardInfo.css'

const CardInfo = ({searchInput, setSearchInput}) => {

    pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})


    const[cardUrl, setCardUrl] = useState('https://images.pokemontcg.io/base/1.png');
    const[cardPrice, setCardPrice] = useState("")
    console.log(searchInput)
return(
    <div className='card-window'>
        <img
            className='card-img'
            style={{ animation: 'flash 1.5s .5s' }}
            src = "https://images.pokemontcg.io/base/1.png"
            alt="new"
        />
        
        <div className='info-chunk'>
            Price  = 
            {/* {CardPrice} */}
        </div>
        <div>
            {/* {cardPrice} */}
        </div>
    </div>
)}

export default CardInfo