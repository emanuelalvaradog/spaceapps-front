import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getImagesFromUid } from "../../store/slices/imagesThunks";
import { LoadingComponent, ResultsComponent } from "../../components";
import "./ResultsPage.css";

export function ResultsPage() {
  const { uid, images, artist } = useSelector((store) => store.images);
  const location = useLocation();
  const dispatch = useDispatch();
  const paramUID = location.pathname
    .split("/share=")[1]
  
  useEffect(() => {
    if (paramUID !== uid) dispatch(getImagesFromUid(paramUID));
  }, []);

  return (
    <div className="results">
      {images.length === 0 ? (
        <LoadingComponent text={loading} />
      ) : (
        <ResultsComponent text={paramUID} images={images} artist={artist} />
      )}
    </div>
  );
}
