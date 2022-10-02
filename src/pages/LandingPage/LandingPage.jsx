import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPrompt } from "../../store/slices/imagesSlice";
import "./LandingPage.scss";

export function LandingPage() {
  const [inputValue, setInputValue] = useState("");
  const [artistValue, setArtistValue] = useState("");
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
        <h1>See</h1>
        <input
          type="text"
          placeholder="mars and rovers"
          value={inputValue}
          onChange={handleInputChange}
        />
        <h1>In </h1>
        <select onChange={handleSelectChange}>
          <option default={true}>Van Gogh</option>
          <option>Da Vinci</option>
          <option>Picasso</option>
          <option>Salvador Dali</option>
        </select>
        <h1>eyes</h1>
        <button onClick={handleSubmit} className="discoverbtn">
          Discover
        </button>
      </div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  );
}
