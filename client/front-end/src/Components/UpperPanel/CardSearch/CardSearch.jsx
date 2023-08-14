import React, { useState } from "react";
import pokemon from "pokemontcgsdk";
import "./CardSearch.css";

// API Key for Database access
pokemon.configure({ apiKey: process.env.API_KEY });

const CardSearch = (props) => {
  const { searchData, setSearchData, handleSearchSubmit } = props;

  return (
    <div className="search-container">
      <form className="card-input" onSubmit={handleSearchSubmit}>
        {/* Input for Card Name */}
        <div className="card-input-container">
          <label className="card-input-title">Name</label>
          
          <div className="search-input">
            <input
            className="card-text-input"
            id="name"
            type="text"
            placeholder="Pikachu"
            value={searchData.name}
            onChange={(event) =>
              setSearchData({ ...searchData, name: event.target.value })
            }
            />
          </div>
        </div>

        {/* Input for Card Set */}
        <div className="card-input-container">
          <label className="card-input-title">Set</label>
          <input
            className="card-text-input"
            type="text"
            placeholder="Base"
            value={searchData.set}
            onChange={(event) =>
                setSearchData({ ...searchData, set: event.target.value })
              }          />
        </div>

        {/* Input for Card Number */}
        <div className="card-input-container">
          <label className="card-input-title">Number</label>
          <input
            className="card-text-input"
            id="number"
            type="text"
            placeholder="4"
            value={searchData.number}
            onChange={(event) =>
                setSearchData({ ...searchData, number: event.target.value })
              }          />
        </div>

        {/* Submit Button */}
        <div className="btn-container">
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardSearch;
