import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postUserInput } from "../../store/slices/imagesThunks";
import { LoadingComponent } from "../../components";
import "./LoadingPage.css";

export function LoadingPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, uid, prompt } = useSelector((store) => store.images);  

  useEffect(() => {
    dispatch(postUserInput());
  }, []);


  useEffect(() => {
    if (!loading && uid) navigate(`/share=${uid}`);
  }, [loading, uid]);

  return <LoadingComponent text={prompt} />;
}
