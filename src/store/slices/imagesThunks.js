import { collection, addDoc } from "firebase/firestore";
import { FireDB } from "../../firebase/firebase.js";
import { setImages } from "./imagesSlice";

const fetchJSONData = async (URL) => {
  const res = await fetch(URL);
  return res.json();
};

const getRandNum = (max) => {
  return Math.floor(Math.random() * (max - 0 + 1)) + min;
};

export function postUserInput() {
  return async (dispatch, getState) => {
    const { userInput, artist } = getState();
    const NasaAPI = `https://images-api.nasa.gov/search?q=${userInput}`;
    const ServerAPI = "https://moonatics.azurewebsites.net/query?data=";
    const imagesState = {
      images: [],
      uid: "",
      prompt,
      artist,
      loading: true,
      error: false,
    };

    const fetchRes = fetchJSONData(NasaAPI);

    for (let i = 0; i < 3; i++) {
      const num = getRandNum(fetchRes.items.length);
      imagesState.images.push({
        originalURL: fetchRes.items[num]?.links[0]?.href,
        description: fetchRes.items[num]?.data?.description,
        cachedImage: "",
      });
    }

    imagesState.loading = false;
    imagesState.error = false;
    const b64Data = window.btoa(JSON.stringify(imagesState));

    try {
      const resData = fetchJSONData(`${ServerAPI}${b64Data}`);

      imagesState.images.map((obj, idx) => {
        obj.cachedImage = resData.images[idx].cachedImage;
      });

      const newDocRef = await addDoc(collection(FireDB, "data"), {
        images: imagesState.images,
        userPrompt: prompt,
        artist,
      });

      dispatch(setImages({ ...imagesState, uid: newDocRef.id }));
    } catch (e) {
      imagesState = { images: [], uid: "", artist, prompt loading: false, error: true };
    }
  };
}

export function getImagesFromUid(uid) {
  return async (dispatch) => {
    // GET DATA FROM FIRESTORE

    const URL = `https://iURL?uid=${uid}`;
    let imagesState = { images: [], uid: "", loading: true, error: false };

    setTimeout(() => {
      imagesState = {
        images: ["img1UID", "img2UID", "img3UID"],
        uid: "mars and rovers",
        loading: false,
        error: false,
      };
      dispatch(setImages(imagesState));
    }, 5000);

    // try {
    //   const resData = fetchJSONData(URL);
    //   imagesState = {
    //     images: resData,
    //     uid: resData.uid,
    //     loading: false,
    //     error: false
    //   }
    //  dispatch(setImages(imagesState))
    // } catch(e) {
    //   imagesState = {images: [], uid: "", loading: false, error: true}
    // }
  };
}
