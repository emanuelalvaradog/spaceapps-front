import { Base64 } from "js-base64";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { FireDB } from "../../firebase/firebase.js";
import { setImages } from "./imagesSlice";
import assets from "../../assets/images.json";

const fetchJSONData = async (URL) => {
  const res = await fetch(URL);
  return res.json();
};

const getRandNum = (max) => {
  return Math.floor(Math.random() * (max - 0 + 1));
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function postUserInput() {
  return async (dispatch, getState) => {
    const { artist, prompt } = getState().images;
    // const NasaAPI = `https://images-api.nasa.gov/search?q=${prompt}`;
    // const ServerAPI = "https://moonatics.azurewebsites.net/query?data=";
    let imagesState = {
      images: [],
      uid: "",
      prompt,
      artist,
      loading: true,
      error: false,
    };

    // const nasaRes = await fetchJSONData(NasaAPI);
    // let fetchRes = nasaRes.collection;

    // console.log(fetchRes);
    // // let fetchRes = fetchResPre.collection;

    // for (let i = 0; i < 3; i++) {
    //   const num = getRandNum(fetchRes.items.length);
    //   imagesState.images.push({
    //     originalURL: fetchRes.items[num]?.links[0]?.href,
    //     description: fetchRes.items[num]?.data[0]?.description,
    //     cachedImage: "",
    //   });
    // }

    // imagesState.loading = false;
    // imagesState.error = false;

    // console.log("imgs state: ", imagesState);
    // // const b64Data = window.btoa(JSON.stringify(imagesState));
    // const b64Data = Base64.encode(JSON.stringify(imagesState));
    // console.log("Fetching: ", b64Data);
    // try {
    //   // const resData = fetchJSONData(`${ServerAPI}"${b64Data}"`);

    //   const resData = await fetchJSONData(
    //     "https://moonatics.azurewebsites.net/query?data=%22eyJpbWFnZXMiOlt7Im9yaWdpbmFsVVJMIjoiaHR0cHM6Ly9pbWFnZXMtYXNzZXRzLm5hc2EuZ292L2ltYWdlL0tTQy0yMDIwMDMxNi1QSC1KUEwwMV8wMDAxL0tTQy0yMDIwMDMxNi1QSC1KUEwwMV8wMDAxfnRodW1iLmpwZyIsImRlc2NyaXB0aW9uIjoiVGhlIOKAnFNlbmQgWW91ciBOYW1lIHRvIE1hcnPigJ0gbG9nbyBpcyBpbnN0YWxsZWQgb24gdGhlIE1hcnMgUGVyc2V2ZXJhbmNlIHJvdmVyIG9uIE1hcmNoIDE2LCAyMDIwLCBpbnNpZGUgdGhlIFBheWxvYWQgSGF6YXJkb3VzIFNlcnZpY2luZyBGYWNpbGl0eSBhdCBOQVNB4oCZcyBLZW5uZWR5IFNwYWNlIENlbnRlciBpbiBGbG9yaWRhLiBXaGVuIHRoZSByb3ZlciBsYW5kcyBvbiB0aGUgUmVkIFBsYW5ldCBvbiBGZWIuIDE4LCAyMDIxLCBpdCB3aWxsIGJlIGNhcnJ5aW5nIHRoZSBuYW1lcyBvZiBtb3JlIHRoYW4gMTAgbWlsbGlvbiBwZW9wbGUgdGhyb3VnaG91dCB0aGUgd29ybGQuIFRob3NlIG5hbWVzIHdlcmUgZXRjaGVkIG9udG8gYSBtaWNyb2NoaXAsIHdoaWNoIHdhcyBwbGFjZWQgYWJvYXJkIFBlcnNldmVyYW5jZS4gTGlmdG9mZiBhYm9hcmQgYSBVbml0ZWQgTGF1bmNoIEFsbGlhbmNlIEF0bGFzIFYgNTQxIHJvY2tldCBpcyB0YXJnZXRlZCBmb3IgbWlkLUp1bHkgZnJvbSBDYXBlIENhbmF2ZXJhbCBBaXIgRm9yY2UgU3RhdGlvbi4gTkFTQeKAmXMgTGF1bmNoIFNlcnZpY2VzIFByb2dyYW0gYmFzZWQgYXQgS2VubmVkeSBpcyBtYW5hZ2luZyB0aGUgbGF1bmNoLiIsImNhY2hlZEltYWdlIjoiIn0seyJvcmlnaW5hbFVSTCI6Imh0dHBzOi8vaW1hZ2VzLWFzc2V0cy5uYXNhLmdvdi9pbWFnZS9QSUExNzI3My9QSUExNzI3M350aHVtYi5qcGciLCJkZXNjcmlwdGlvbiI6IlBsYW5uaW5nIGZvciBOQVNBIDIwMjAgTWFycyByb3ZlciBlbnZpc2lvbnMgYSBiYXNpYyBzdHJ1Y3R1cmUgdGhhdCBjYXBpdGFsaXplcyBvbiBleGlzdGluZyBkZXNpZ24gYW5kIGVuZ2luZWVyaW5nLCBidXQgd2l0aCBuZXcgc2NpZW5jZSBpbnN0cnVtZW50cyBzZWxlY3RlZCB0aHJvdWdoIGNvbXBldGl0aW9uIGZvciBhY2NvbXBsaXNoaW5nIGRpZmZlcmVudCBzY2llbmNlIG9iamVjdGl2ZXMuIiwiY2FjaGVkSW1hZ2UiOiIifSx7Im9yaWdpbmFsVVJMIjoiaHR0cHM6Ly9pbWFnZXMtYXNzZXRzLm5hc2EuZ292L2ltYWdlL1BJQTA0NDEzL1BJQTA0NDEzfnRodW1iLmpwZyIsImRlc2NyaXB0aW9uIjoiQW4gYXJ0aXN0IGNvbmNlcHQgcG9ydHJheXMgYSBOQVNBIE1hcnMgRXhwbG9yYXRpb24gUm92ZXIgb24gdGhlIHN1cmZhY2Ugb2YgTWFycy4gVHdvIHJvdmVycyB3ZXJlIGxhdW5jaGVkIGluIDIwMDMgYW5kIGFycml2ZWQgYXQgc2l0ZXMgb24gTWFycyBpbiBKYW51YXJ5IDIwMDQuIiwiY2FjaGVkSW1hZ2UiOiIifV0sInVpZCI6IiIsInByb21wdCI6Im1hcnMgYW5kIHJvdmVyIiwiYXJ0aXN0IjoiaW4gdGhlIHN0eWxlIG9mICIsImxvYWRpbmciOmZhbHNlLCJlcnJvciI6ZmFsc2V9%22"
    //   );

    //   imagesState.images.map((obj, idx) => {
    //     obj.cachedImage = resData.images[idx].cachedImage;
    //   });

    //   let docid = uuidv4();

    //   await setDoc(doc(FireDB, "data", docid), {
    //     images: imagesState.images,
    //     userPrompt: prompt,
    //     artist,
    //     id: docid,
    //   });

    //   // const newDocRef = await addDoc(collection(FireDB, "data"), {
    //   //   images: imagesState.images,
    //   //   userPrompt: prompt,
    //   //   artist,
    //   // });

    // } catch (e) {
    //   imagesState = {
    //     images: [],
    //     uid: "",
    //     artist: artist,
    //     prompt,
    //     loading: false,
    //     error: true,
    //   };
    //   dispatch(setImages(imagesState));
    // }
    const imgData = assets.images;

    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        const num = getRandNum(imgData.length);
        imagesState.images.push(imgData[num]);
      }

      dispatch(setImages({ ...imagesState, loading: false, uid: uuidv4() }));
    }, 3000);
  };
}

export function getImagesFromUid(uid) {
  return async (dispatch) => {
    // GET DATA FROM FIRESTORE
    let imagesState = {
      images: [],
      uid,
      artist: "",
      prompt: "",
      loading: true,
      error: false,
    };
    try {
      const docRef = doc(FireDB, "data", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { userPrompt, images, artist } = { ...docSnap.data() };
        imagesState = {
          images,
          uid,
          artist,
          prompt: userPrompt,
          loading: false,
          error: false,
        };
      } else {
        console.log("DOESNT EXIST");
      }

      dispatch(setImages(imagesState));
    } catch (error) {
      imagesState.loading = false;
      imagesState.error = true;
      console.log(error);

      dispatch(setImages(imagesState));
    }
  };
}
