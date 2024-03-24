// import React, { useState } from "react";
// import { storage } from "../../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

// const UploadImages = () => {
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const uploadFile = async () => {
//     if (imageUpload == null) return;

//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     try {
//       const snapshot = await uploadBytes(imageRef, imageUpload);
//       const url = await getDownloadURL(snapshot.ref);
//       setImageUrls([url]);
//     } catch (error) {
//       console.error("Error uploading the file: ", error);
//     }
//   };
//   console.log(imageUrls);
//   return (
//     <div>
//       <label>Event Photos:</label>
//       <input
//         type="file"
//         name="eventPhotos"
//         // value={eventPhotos}
//         onChange={(e) => {
//           setImageUpload(e.target.files[0]);
//         }}
//       />
//       <button onClick={uploadFile}>upload image</button>
//     </div>
//   );
// };

// export default UploadImages;

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import classes from "./UploadImages.module.css";

const UploadImages = ({ onImageUrls, imgCount, imgType }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const uploadFiles = async () => {
    const uploadPromises = selectedImages.map(async (image) => {
      const file = await fetch(image).then((res) => res.blob());
      const imageName = `${uuidv4()}.${file.type.split("/")[1]}`;
      const imageRef = ref(storage, `images/${imageName}`);
      try {
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
      } catch (error) {
        console.error("Error uploading the file: ", error);
        return null;
      }
    });

    try {
      const urls = await Promise.all(uploadPromises);

      if (urls.length > 0) {
        setImageUrls((prevUrls) => [
          ...prevUrls,
          ...urls.filter((url) => url !== null),
        ]);

        // Clear selected images after successful upload
        setSelectedImages([]);

        // Call the onImageUrls prop with the updated imageUrls array
        onImageUrls((prevUrls) => [
          ...prevUrls,
          ...urls.filter((url) => url !== null),
        ]);
      }
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  };
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <div className={classes.section}>
      <label className={classes.labelContainer}>
        + Add {imgType} Images
        <br />
        <span>up to {imgCount} images</span>
        <input
          type="file"
          name="images"
          className={classes.inputFile}
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

      {selectedImages.length > 0 &&
        (selectedImages.length > imgCount ? (
          <p className={classes.errorMessage}>
            You can't upload more than {imgCount} images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button className={classes.uploadButton} onClick={uploadFiles}>
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === imgCount ? "" : "S"}
          </button>
        ))}

      <div className={classes.uploadedImagesContainer}>
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className={classes.uploadedImage}>
                <img src={image} height="200" alt="upload" />
                <button
                  className={classes.deleteButton}
                  onClick={() => deleteHandler(image)}
                >
                  delete image
                </button>
                <p className={classes.imageIndex}>{index + 1}</p>
              </div>
            );
          })}
      </div>

      {/* Display uploaded images */}
      {imageUrls.length > 0 && (
        <div className={classes.uploadedImagesContainer}>
          <h2>Uploaded Images</h2>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} height="200" alt={`uploaded_${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImages;
