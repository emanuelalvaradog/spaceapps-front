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
  const { loading, uid, prompt, error } = useSelector((store) => store.images);  

  useEffect(() => {
    dispatch(postUserInput());
  }, []);

  useEffect(() => {
    if (!loading && uid && !error) navigate(`/share=${uid}`);
  }, [loading, uid]);


  if(error) return <LoadingComponent text={"Looks like you're searching in the wrong galaxy"} />

  return <LoadingComponent text={prompt} />
}
