import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getImagesFromUid } from "../../store/slices/imagesThunks";
import { LoadingComponent, ResultsComponent } from "../../components";
import "./ResultsPage.css";

export function ResultsPage() {
  const { uid, images, artist, error, prompt } = useSelector((store) => store.images);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const paramUID = location.pathname
    .split("/share=")[1]
  
  useEffect(() => {
    if (paramUID !== uid) dispatch(getImagesFromUid(paramUID));
  }, []);

  useEffect(() => {
    console.log("RESULTS ERROR", error)
  }, [error])


  return (
    <div className="results">
      {error ? (
        <LoadingComponent text={"Guess you're searching in the wrong galaxy"} />
      ) : images.length === 0 ? <LoadingComponent text={"Loading"} /> : (
        <ResultsComponent prompt={prompt} images={images} artist={artist} />
      )}
    </div>
  );
}
