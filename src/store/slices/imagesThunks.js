import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { FireDB } from "../../firebase/firebase.js";
import { setImages } from "./imagesSlice";


const fetchJSONData = async (URL) => {
  const res = await fetch(URL);
  return res.json();
};

const getRandNum = (max) => {
  return Math.floor(Math.random() * (max - 0 + 1));
};

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function postUserInput() {
  return async (dispatch, getState) => {
    const { artist, prompt } = getState().images;
    const NasaAPI = `https://images-api.nasa.gov/search?q=${prompt}`;
    const ServerAPI = "https://moonatics.azurewebsites.net/query?data=";
    let imagesState = {
      images: [],
      uid: "",
      prompt,
      artist: `in the style of ${artist}`,
      loading: true,
      error: false,
    };

    const fetchResPrev = await fetchJSONData(NasaAPI).then(async data => {

      let fetchRes = data.collection;

    console.log(fetchRes)
    // let fetchRes = fetchResPre.collection;

    for (let i = 0; i < 3; i++) {
      const num = getRandNum(fetchRes.items.length);
      imagesState.images.push({
        originalURL: fetchRes.items[num]?.links[0]?.href,
        description: fetchRes.items[num]?.data[0]?.description,
        cachedImage: "",
      });
    }

    imagesState.loading = false;
    imagesState.error = false;

    console.log("imgs state: ", imagesState)
    const b64Data = window.btoa(JSON.stringify(imagesState));

    try {
      const resData = fetchJSONData(`${ServerAPI}${b64Data}`);

      imagesState.images.map((obj, idx) => {
        obj.cachedImage = resData.images[idx].cachedImage;
      });


      let docid = uuidv4();
      const newDocRef = await setDoc(doc(FireDB, "data",  docid), {
        images: imagesState.images,
        userPrompt: prompt,
        artist,
        id: docid
      })

      // const newDocRef = await addDoc(collection(FireDB, "data"), {
      //   images: imagesState.images,
      //   userPrompt: prompt,
      //   artist,
      // });

      dispatch(setImages({ ...imagesState, uid: docid }));
    } catch (e) {
      imagesState = { images: [], uid: "", artist: artist, prompt, loading: false, error: true };
      dispatch(setImages(imagesState))
    }

   });
  };
}

export function getImagesFromUid(uid) {
  return async (dispatch) => {
    // GET DATA FROM FIRESTORE
    let imagesState = { images: [], uid, artist: "", prompt: "", loading: true, error: false };
    try {  
      const docRef = doc(FireDB, "data", uid)
      const docSnap = await getDoc(docRef)

      
      if(docSnap.exists()) {
        const {userPrompt, images, artist} = {...docSnap.data()}
        imagesState = {
          images, uid, artist, prompt: userPrompt, loading: false, error: false
        }
      } else {
        console.log("DOESNT EXIST")
      }

      dispatch(setImages(imagesState))

    } catch (error) {
      imagesState.loading = false;
      imagesState.error = true;
      console.log(error);
      
      dispatch(setImages((imagesState)))
    }
  };
}
