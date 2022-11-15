import React, {useState} from 'react'
import pokemon from 'pokemontcgsdk'
import CardSearch from '../CardSearch/CardSearch'
import CardInfo from '../CardInfo/CardInfo'
import './UpperPanelContainer.css'


pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})

const UpperPanelContainer = () => {

const [searchData, setSearchData] = useState({
    name: "",
    set: "",
    number: ""

})

const [fetchedCard, setFetchedCard] = useState({
    img: "https://images.pokemontcg.io/base/1.png",
    price: "",
    id: null 
})


// Runs when search button clicked
const handleSubmit = event => {
    console.log(searchData.name)
    console.log(searchData.number)
    console.log(searchData.set)
    console.log("In the function")

    event.preventDefault(); // prevent page refresh
    
    //Query to Pokemon API
    pokemon.card.all({ q: `name:${searchData.name} number:${searchData.number}`}).then(result => {
        for (let i = 0; i < result.length; i++) {
            console.log(result[i])
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
//console.log({foo:fetchedCard})
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

