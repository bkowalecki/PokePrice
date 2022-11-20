import { useState } from "react";
import pokemon from "pokemontcgsdk";
import {db, addCard } from "../../../firebase";
import defaultImg from '../../../pokemon_card_back.jpg'

import "./CardInfo.css";

const CardInfo = ({ fetchedCard, searchData, user, setUser, updatePortfolio, addCardToPortfolio}) => {
  // pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})

  console.log(fetchedCard)
//   console.log(addCardToPortfolio)

//   const addCardToPortfolio = async (user) => {
//     // const newCard = await addCard(db, details);
//     alert("added card");
//     await addCard(db, user, fetchedCard.id);
//     setUser(...user.portfolio, fetchedCard.id)
//     //setUser({ ...details, portfolio: [fetchedCard.id] });
//   };


console.log(user)
  return (
    <div className="card-info-wrapper">
      {fetchedCard.id !== null ? (
        <div className="card-window">
          
          <div className="img-wrapper">
            <img
                className="card-img"
                src={fetchedCard.img} 
                alt="new"
            />
          </div>

          <div className="info-chunk">
            <div> 
                Price
            </div> 
            <div>
                ${fetchedCard.price}
            </div>
            <button onClick={addCardToPortfolio} className="add-card-btn">Add card</button>
          </div>

        </div>
      ) : (
        <div className="card-window">
          <img
            className="card-img"
            src={defaultImg}
            alt="new"
          />
        </div>
      )}
    </div>
  );
};

export default CardInfo
