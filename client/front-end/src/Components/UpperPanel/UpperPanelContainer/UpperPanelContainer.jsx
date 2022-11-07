import React, {useState} from 'react'
import pokemon from 'pokemontcgsdk'
import { useEffect } from 'react'
import CardSearch from '../CardSearch/CardSearch'
import CardInfo from '../CardInfo/CardInfo'


pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})

// const [name, setName] = useState('');
// const [set, setSet] = useState('');
// const [number, setNumber] = useState('');
// const[cardUrl, setCardUrl] = useState('https://images.pokemontcg.io/base/1.png');
// const[cardPrice, setCardPrice] = useState("")

// const [cardObject, setCardObject] = useState({});

// const cardObject = {
//     cardName: name,
//     cardSet: set,
//     cardNumber: number,
//     imgUrl: cardUrl,
//     price: cardPrice
// }

const [searchInput, setSearchInput] = useState({
    name: "",
    set: "",
    number: "",
    img: "https://images.pokemontcg.io/base/1.png",
    price:""
})



// Runs when search button clicked
const handleSearch = event => {
    console.log("In the function")

    event.preventDefault(); // prevent page refresh
    
    pokemon.card.all({ q: `name:${name} number:${number} set.name:${set}`}).then(result => {
        for (let i = 0; i < result.length; i++) {
            if(result[i].set.name.toUpperCase() == set.toUpperCase()){
                setCardUrl(result[i].images.small)
                setCardPrice(result[i].cardmarket.prices.trendPrice)
                setName(result[i].name)
                setCardId(result[i].id)
                setSet(result[i].set.name)
                console.log(result[i])
               
            } console.log(set)
        }
        
    })
};


const UpperPanelContainer = () => {

    return(
        <div className='upper-panel-container'>
            <CardSearch 
                handleSearch = {handleSearch}
            />
            <CardInfo 
                searchInput={searchInput}
                setSearchInput={setSearchInput}            />
        </div>
    )

}

export default UpperPanelContainer

