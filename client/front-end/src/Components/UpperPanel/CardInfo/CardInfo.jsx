import { useState } from "react";
import pokemon from "pokemontcgsdk";
import "./CardInfo.css";

const CardInfo = ({ fetchedCard, searchData, addCardToPortfolio }) => {
  // pokemon.configure({apiKey: 'd47970f2-3447-4b91-92f8-8b3427ebb339'})

  console.log(fetchedCard)
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
            src={fetchedCard.img}
            alt="new"
          />
        </div>
      )}
    </div>
  );
};

export default CardInfo
