import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LandingPage.css";

export function LandingPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleInputChange(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      <h1 className="title">
        GET TO KNOW <span>NASA</span>
      </h1>
      <div className="hashtag-container">
        <h2 className="hashtag">#moon</h2>
        <h2 className="hashtag">#stars</h2>
        <h2 className="hashtag">#rovers</h2>
        <h2 className="hashtag">#earth</h2>
        <h2 className="hashtag">#mars</h2>
      </div>

      <div className="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#10182B"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Begin your search through the universe..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleSubmit} className="discoverbtn">
        Discover
      </button>
    </div>
  );
}
