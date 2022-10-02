import "./ResultsComponent.scss";

export function ResultsComponent({ prompt, images, artist }) {
  async function handleShare() {
    const url = window.location.href;

    if (!navigator.canShare()) {
      navigator.clipboard.writeText(url);
      alert("URL copied to clipboard");
    } else {
      try {
        await navigator.share({
          title: "The Art in Our Worlds",
          text: `Get to know the universe in the eyes of ${artist}`,
          url,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="mainContainer">
      <div  className="resultTextContainer">
          <div className="resultTextTitle">
            <h1>{`"${prompt}" in the eyes of `}<span>{artist}</span></h1>
            <button onClick={handleShare}>Share your experience</button>
          </div>
          <div className="resultImages">
            {images.map((img) => {
              return (
                <div className="imageContainer">
                  <div className="imageContainerImg">
                    <img src={img.originalURL} key={img.orignalURL} />
                    <img
                      src={`data:image/jpeg;base64,${img.cachedImage}`}
                      key={img.cachedImage}
                    />
                  </div>
                  <div className="imageContainerTxt">
                    <p>
                      {img.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
          <div className="resultStars">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
    </div>
  );
}
