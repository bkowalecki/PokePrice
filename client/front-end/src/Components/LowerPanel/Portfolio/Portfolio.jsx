import React from "react";
import { useEffect } from "react";
import "./Portfolio.css";

// Table headings
const ThData = ({ heading }) => {
  return heading.map((data) => {
    return (
      <th className="portfolio-heading" key={data}>
        {data}
      </th>
    );
  });
};

// Card data
const TdData = ({ cardPortfolio }) => {
  if (cardPortfolio.length === 0) {
    return (
      <tr className="empty-row">
        <td className="empty-cell">No cards to show</td>
      </tr>
    );
  }

  const column = Object.keys(cardPortfolio[0]);

  return cardPortfolio.map((data) => {
    return (
      <tr className="card-portfolio-data">
        {column.map((v) => {
          if (v === "cardImg") {
            return (
              <td className="card-img-portfolio-wrapper">
                <img className="card-img-portfolio" src={data[v]} />
              </td>
            );
          } else if (v === "cardId") {
            return;
          } else if (v === "cardPrice") {
            return <td className="table-data">${data[v]}</td>;
          }
          return <td className="table-data">{data[v]}</td>;
        })}
      </tr>
    );
  });
};

const Portfolio = ({ cardPortfolio, updatePortfolio, user }) => {
  const heading = ["Image", "Price", "Name", "Set", "Number"];

  const column = null;

  let mostExpeniveCardPrice = 0;
  let mostExpensiveCardImg = ""
  let totalPortfolioValue = 0;
  for (const data of cardPortfolio) {
    totalPortfolioValue = totalPortfolioValue + data.cardPrice;
    
    let tempCardPrice = data.cardPrice

    if(tempCardPrice > mostExpeniveCardPrice){
        mostExpeniveCardPrice = tempCardPrice
        mostExpensiveCardImg = data.cardImg
    }
}
  
  totalPortfolioValue=totalPortfolioValue.toFixed(2);

  // Go through user.portfolio
  // Grab each id and query
  // Set the resulting card object's img, name, set, and price
  // To the corresponding html


  // Update portfolio on user change
  useEffect(() => {
    updatePortfolio();
  }, [user]);

  return (
    <div className="portfolio">
        
        
         
      <div className="portfolio-stats-wrapper">
        <div className="total-cards-wrapper">
          <div>Cards</div>
          <div>{cardPortfolio.length}</div>
        </div>
        
        <div className="top-card-wrapper">
            <div>Top Card</div>
            <div className="top-card-img-wrapper">
                <img className="top-card-img" src={mostExpensiveCardImg}/>
            </div>
        </div>

        <div className="total-value-wrapper">
          <div>Portfolio Value</div>
          <div>${totalPortfolioValue}</div>
        </div>

      </div>

     

      <div className="portfolio-wrapper">
        <table className="portfolio-table">
          <thead className="table-row">
            <tr>
              <ThData heading={heading} />
            </tr>
          </thead>
          <tbody className="card-portfolio-data">
            <TdData cardPortfolio={cardPortfolio} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
