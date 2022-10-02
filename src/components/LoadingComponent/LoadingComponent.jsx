import "./LoadingComponent.scss";

export function LoadingComponent({ text }) {
  return (
    <div className="loadingStars">
      <div className="loadingTextContainer">
        <h1>{`"${text}"`}</h1>
      </div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  );
}
