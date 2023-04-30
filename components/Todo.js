import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "";
import { v4 } from "uuid";
import Image from "next/image";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [url, setUrl] = useState("");

  const imagesListRef = ref(storage, "data/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  //   useEffect(() => {
  //    const starsRef = ref(storage, 'images/stars.jpg');

  // // Get the download URL
  // getDownloadURL(starsRef)
  //   .then((url) => {
  //     setUrl(url);
  //   })
  //   }, []);

  return (
    <div className="App">
      <Image
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/ineuron8-52cc4.appspot.com/o/images%2Fks.pngf6b3600f-44b7-4748-91c4-a58f9b6e72f2?alt=media&token=14b55c09-3f2c-49aa-9905-11ed7916b793"
      />
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url) => {
        return <Image key={url} src={url} alt="" />;
      })}
    </div>
  );
}

export default App;
