import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPrompt } from "../../store/slices/imagesSlice";
import "./LandingPage.scss";

export function LandingPage() {
  const [inputValue, setInputValue] = useState("");
  const [artistValue, setArtistValue] = useState("Van Gogh's");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (!inputValue) return;
    dispatch(setPrompt({ prompt: inputValue, artist: artistValue }));
    navigate(`/search=${inputValue}`);

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
        <div className="searchContainer">
          <h1>See</h1>
          <input
            required={true}
            type="text"
            placeholder="mars and rovers"
            value={inputValue}
            onChange={handleInputChange}
          />
          <h1>In </h1>
          <select onChange={handleSelectChange}>
            <option default={true}>Van Gogh's</option>
            <option>Da Vinci's</option>
            <option>Picasso's</option>
            <option>Salvador Dali's</option>
          </select>
          <h1>eyes</h1>
          <button onClick={handleSubmit} className="discoverbtn">
            Discover
          </button>
        </div>
      </div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  );
}
