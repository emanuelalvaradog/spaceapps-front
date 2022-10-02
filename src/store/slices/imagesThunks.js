import {setImages} from './imagesSlice'

const fetchJSONData = async (URL) => {
  const res = await fetch(URL)
  return res.json()
}

export function postUserInput(userInput) {
  return async(dispatch, getState) => {
    const URL = `http://apiURL?input=${userInput}`
    let imagesState = {images: [], uid: "", loading: true, error: false}

    setTimeout(() => {
      imagesState = {
        images: ["img1", "img2", "img3"],
        uid: userInput,
        loading: false,
        error: false
      }

      dispatch(setImages(imagesState))
    }, 5000 )


    try{
      const resData = fetchJSONData(URL)
    
      imagesState = {
        images: resData.images,
        uid: resData. uid,
        loading: false,
        error: false
      }

    } catch(e) {
      imageState = {images: [], uid:"", loading: false, error: true}
    }

  }
}