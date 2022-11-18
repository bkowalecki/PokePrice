import React, {useState} from 'react'
import pokemon from 'pokemontcgsdk'
import CardSearch from '../CardSearch/CardSearch'
import CardInfo from '../CardInfo/CardInfo'
import './UpperPanelContainer.css'


pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})

const UpperPanelContainer = ({props, searchData, setSearchData, fetchedCard, setFetchedCard, addCardToPortfolio}) => {

// Runs when search button clicked
const handleSubmit = event => {
    // console.log(searchData.name)
    // console.log(searchData.number)
    // console.log(searchData.set)
    // console.log("In the function")

    event.preventDefault(); // prevent page refresh
    
    //Query to Pokemon API
    pokemon.card.all({ q: `name:${searchData.name} number:${searchData.number}`}).then(result => {
        for (let i = 0; i < result.length; i++) {
            // console.log(result[i])
            if(result[i].set.name.toUpperCase() === searchData.set.toUpperCase()){
                setFetchedCard({
                    img: result[i].images.small,
                    price: result[i].cardmarket.prices.trendPrice,
                    id: result[i].id
                })
            } 
        }
        
    })
};
console.log(props.username);

    return(

    <div>
        <div className='upper-panel-container'>
            <CardSearch 
                handleSubmit = {handleSubmit}
                searchData = {searchData}
                setSearchData = {setSearchData}
            />
            <CardInfo 
                fetchedCard = {fetchedCard}
                searchData = {searchData}
                addCardToPortfolio = {addCardToPortfolio}
            />
        </div>
    </div>
    )

}

export default UpperPanelContainer

