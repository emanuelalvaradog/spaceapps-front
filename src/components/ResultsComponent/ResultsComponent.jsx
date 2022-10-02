import "./ResultsComponent.scss";

export function ResultsComponent({ text, images }) {

  async function handleShare() {
    const url = window.location.href;
    if (!navigator.canShare) {
      navigator.clipboard.writeText(url);
      alert("URL copied to clipboard")
    } else {
      try {
        await navigator.share({
          title: "The Art in Our Worlds",
          text: "Get to know the universe in a different perspective",
          url,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="resultStars">
      <div className="resultTextContainer">
        <div className="resultTextTitle">
          <h1>{`"${text}"`}</h1>
          <button onClick={handleShare}>Share your experience</button>
          
        </div>
        <div className="resultImages">
          {images.map((img) => {
            return (
              <div className="imageContainer">
                <div className="imageContainerImg">
                  <p key={img}>{img}</p>
                  <p key={img}>{img}</p>
                </div>
                <div className="imageContainerTxt">
                  <p>
                    In style of <span>Picasso</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  );
}
