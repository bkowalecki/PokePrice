import React from 'react'
import pokemon from 'pokemontcgsdk'
import { useState, useEffect } from 'react'
import './Portfolio.css'

const Portfolio = ({addCardToPortfolio,setUser, user, tempCard, setTempCard, cardPortfolio, setCardPortfolio}) => {


    // Go through user.portfolio
    // Grab each id and query
    // Set the resulting card object's img, name, set, and price
    // To the corresponding html 

    // cardPortfolio = [{"name":name,...}, {"name":name,...}]
    // const [cardPortfolio, setCardPortfolio] = useState([])

    // console.log(cardPortfolio.length)

    useEffect(() => {
    
        // for (let i = 0; i < 2; i++) {
        //     pokemon.card.find(user.portfolio[i]).then(card => {
                
        //         setTempCard({
        //             cardName : card.name,
        //             cardId : card.id, 
        //             cardPrice : card.cardmarket.prices.trendPrice,
        //             cardImg : card.images.small, 
        //             cardSet : card.set.name, 
        //             cardNumber : card.number  
        //         })  
        //         // alert(cardPortfolio)
                    
        //     })
        // setCardPortfolio(current => [...current, tempCard]);  
               
        // }
        // setCardPortfolio(current => [...current, tempCard]); 
//   user.portfolio.forEach(id => {
//         console.log(id)
//         pokemon.card.find(id).then(card => {
        
//             setTempCard({
//                 cardName : card.name,
//                 cardId : card.id, 
//                 cardPrice : card.cardmarket.prices.trendPrice,
//                 cardImg : card.images.small, 
//                 cardSet : card.set.name, 
//                 cardNumber : card.number  
//             })        
//         })

//         setCardPortfolio(current => [...current, tempCard]);    
        
//     });

      }, []);

    // console.log("here")

    // console.log(tempCard)

  

    // console.log(cardPortfolio)



// Dummy Data
//[{name: name, ...}, {}, {}, {}]

  return (
    <div className='portfolio-wrapper'>
            <table className='portfolio-table'>
                <tr className='table-row'>
                    <th className='tch'>Image</th>
                    <th className='tch'>Name</th>
                    <th className='tch'>Set</th>
                    <th className='tch'>Number</th>
                    <th className='tch'>Price</th>
                    <th className='tch'>ID</th>
                </tr>
                <tr className='table-row'>
                    <td className='card-img-portfolio-container table-cell'>   
                        <img
                        className="card-img-portfolio"
                        src={tempCard.cardImg}
                        />
                    </td>
                    <td className='tc'>{tempCard.cardName}</td>
                    <td className='tc'>{tempCard.cardSet}</td>
                    <td className='tc'>{tempCard.cardNumber}</td>
                    <td className='tc'>{tempCard.cardPrice}</td>
                    <td className='tc'>{tempCard.cardId}</td>
                </tr>
            </table>

    </div>
)

}

export default Portfolio