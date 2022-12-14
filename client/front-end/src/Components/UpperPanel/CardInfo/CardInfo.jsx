import { useState } from "react";
import {db, addCard } from "../../../firebase";
import defaultImg from '../../../pokemon_card_back.jpg'

import "./CardInfo.css";

const CardInfo = ({ fetchedCard, addCardToPortfolio, deleteCardFromPortfolio}) => {

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
            <div className="btn-container">
                <button onClick={addCardToPortfolio} className="add-card-btn">Add</button>
                <button onClick={deleteCardFromPortfolio} className="remove-card-btn">Remove</button>
            </div>
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
