import React, {useState} from 'react'
import pokemon from 'pokemontcgsdk'
import { useEffect } from 'react'
import CardSearch from '../CardSearch/CardSearch'
import CardInfo from '../CardInfo/CardInfo'


pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})

const UpperPanelContainer = () => {
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


const [searchData, setSearchData] = useState({
    name: "",
    set: "",
    number: ""

})

const [fetchedCard, setFetchedCard] = useState({
    img: "https://images.pokemontcg.io/base/1.png",
    price: ""
})


// Runs when search button clicked
const handleSubmit = event => {
    console.log("In the function")

    event.preventDefault(); // prevent page refresh
    
    pokemon.card.all({ q: `name:${searchData.name} number:${searchData.number} set.name:${searchData.set}`}).then(result => {
        for (let i = 0; i < result.length; i++) {
            if(result[i].set.name.toUpperCase() == searchData.set.toUpperCase()){
                // setCardUrl(result[i].images.small)
                // setCardPrice(result[i].cardmarket.prices.trendPrice)
                // setName(result[i].name)
                // setCardId(result[i].id)
                // setSet(result[i].set.name)
                setFetchedCard({
                    img: result[i].images.small,
                    price: result[i].cardmarket.prices.trendPrice
                })
                console.log(result[i])
               
            } 
        }
        
    })
};
console.log({searchData})


    return(
        <div className='upper-panel-container'>
            <CardSearch 
                handleSubmit = {handleSubmit}
                searchData = {searchData}
                setSearchData = {setSearchData}
            />
            <CardInfo 
                fetchedCard = {fetchedCard}
            />
        </div>
    )

}

export default UpperPanelContainer

