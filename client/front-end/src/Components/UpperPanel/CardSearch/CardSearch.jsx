import React, {useState} from 'react'
import pokemon from 'pokemontcgsdk'
import { useEffect } from 'react'
import './CardSearch.css'



// API Key for Database access
pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})


const CardSearch = ({props}) => {

const [name, setName] = useState('');
const [set, setSet] = useState('');
const [number, setNumber] = useState('');
const[cardUrl, setCardUrl] = useState('https://images.pokemontcg.io/base/1.png');
const[cardPrice, setCardPrice] = useState("");
const[cardId, setCardId] = useState("");

const [setList, setSetList] = useState([]);
// const [setPokemonName, setNameList] = useState([]);

// const [setNumCardsInSet, setNumCards] = useState({});


// useEffect(() => {

//     // Set List
//     const set_list = []
//     // Populate set list
//     pokemon.set.all().then((cards) => {
//         for (let i = 0; i < cards.length; i++) {
//             set_list.push({
//                 label: cards[i].name,
//                 value: cards[i].name
//             })
//         }
//         setSetList(set_list)
//     })
//     }, []);


//    Card Search Functionality
//    const handleSubmit = event => {
//     console.log("In the function")

//     event.preventDefault(); // prevent page refresh
    
//     pokemon.card.all({ q: `name:${name} number:${number} set.name:${set}`}).then(result => {
//         for (let i = 0; i < result.length; i++) {
//             if(result[i].set.name.toUpperCase() == set.toUpperCase()){
//                 setCardUrl(result[i].images.small)
//                 setCardPrice(result[i].cardmarket.prices.trendPrice)
//                 setName(result[i].name)
//                 setCardId(result[i].id)
//                 setSet(result[i].set.name)
//                 console.log(result[i])
               
//             } console.log(set)
//         }
        
//     })
// };


    const handleSubmit = () => {
        props.handleSearch()
    }


//     childToParent(cardObject)
  
//     // 👇️ access input values here
//     // console.log('Name ', name);
//     // console.log('Set ', set);
//     // console.log('Number ', number);
//     // console.log('cardd ', cardUrl);

//     // 👇️ clear all input values in the form
//     // setName('');
//     // setSet('');
//     // setNumber('');

  



return (
    <div className="search-container">
        <form className='card-input' onSubmit={handleSubmit}>
            
            {/* Input for Card Name */}
            <div className='card-input-container'>
                <label className='card-input-title'>Name</label>
                <input 
                    className='card-text-input' 
                    id="name" type="text"  
                    placeholder="Charizard"
                    onChange={event => setName(event.target.value)}
                />
            </div>

            {/* Input for Card Set */}
            <div className='card-input-container'>
                <label className='card-input-title'>Set</label>
                <input 
                    className='card-text-input'
                    type="text"
                    placeholder="Chilling Reign"
                    onChange={event => setSet(event.target.value)}
                />
            </div>

            {/* Input for Card Number */}
            <div className='card-input-container'>
                <label className='card-input-title'>Number</label>
                <input 
                    className='card-text-input'
                    id="number" 
                    type="text"  
                    placeholder="48"
                    onChange={event => setNumber(event.target.value)}
                />
            </div>

           {/* Submit Button */}
            <div className='btn-container'>
                <button type='submit' className='search-btn'>Search</button>
            </div>

        </form>
    </div>
  )

}

export default CardSearch