import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";

export function LandingPage() {
  const [inputValue, setInputValue] = useState("");
  const [artistValue, setArtistValue] = useState("");
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  function handleSelectChange(e) {
    const { value } = e.target;
    setArtistValue(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search=${inputValue}?artist=${artistValue}`);

    // Call thunk to change store values
    // Pipeline:
    // -- Given the user input call the gpt3PipelineApi and get the results to the store via a thunk
    // -- While loading, send the user to route ¿/search?
    // -- Loading page will be visible during waiting time.
    // -- Once the thunk gets the result, update the store and navigate to /share:uid

    // Whenever /share:uid is called, use getUidData from thunks to validate if UID exists and navigate to /share:uid
    // otherwise navigate to /
  }

  return (
    <div className="Page">
      <div className="search">
        <h1>See</h1>
        <input
          type="text"
          placeholder="mars and rovers"
          value={inputValue}
          onChange={handleInputChange}
        />
        <h1>In </h1>
        <select onChange={handleSelectChange}>
          <option>Van Gogh</option>
          <option>Da Vinci</option>
          <option>Picasso</option>
          <option>Salvador Dali</option>
        </select>
        <h1>eyes</h1>
      </div>
      <button onClick={handleSubmit} className="discoverbtn">
        Discover
      </button>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  );
}
