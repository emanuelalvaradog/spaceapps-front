import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postUserInput } from "../../store/slices/imagesThunks";
import { LoadingComponent } from "../../components";
import "./LoadingPage.css";

export function LoadingPage({ userInput = "" }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.images);

  if (!userInput) {
    userInput = location.pathname
      .split("/search=")[1]
      .toLowerCase()
      .replaceAll("%20", " ");
  }

  useEffect(() => {
    dispatch(postUserInput(userInput));
  });

  useEffect(() => {
    if (!loading) navigate(`/share=${userInput}`);
  }, [loading]);

  return <LoadingComponent text={userInput} />;
}
