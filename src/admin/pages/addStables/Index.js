import React, { useState } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import UploadImages from "../../adminComponents/UploadImages/Index";

import classes from "./AddStables.module.css";

const AddStables = () => {
  const [stableName, setStableName] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [logoImageUrls, setLogoImageUrls] = useState([]);
  const [allPhotosImageUrls, setAllPhotosImageUrls] = useState([]);
  const logoImagesListRef = ref(storage, "images/logo/");
  const allPhotosImagesListRef = ref(storage, "images/all-photos/");

  const handleLogoImageUrls = (urls) => {
    setLogoImageUrls(urls);
  };

  const handleAllPhotosImageUrls = (urls) => {
    setAllPhotosImageUrls(urls);
  };

  const uploadFile = async (imageUpload, imagesListRef) => {
    if (imageUpload == null) return;

    const imageRef = ref(imagesListRef, `${imageUpload.name + uuidv4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading the file: ", error);
      return null;
    }
  };

  const onSubmitHandler = async () => {
    try {
      const fetchStableData = {
        stable_name: stableName,
        description: description,
        number: number,
        address: address,
        logo_images: logoImageUrls,
        all_photos_images: allPhotosImageUrls,
      };

      // Assuming that you want to make a POST request to your Firebase Realtime Database
      const response = await fetch(
        "https://equestrian-app-e534c-default-rtdb.firebaseio.com/stables.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchStableData),
        }
      );

      if (!response.ok) {
        console.error("Failed to submit data to the server.");
      } else {
        console.log("Data submitted successfully.");
      }
    } catch (error) {
      console.error("An error occurred while submitting data:", error);
    }
  };

  return (
    <div>
      <h1>Add Stables</h1>
      <div className={classes.inputs}>
        <label>Stable Name</label>
        <input
          type="text"
          value={stableName}
          onChange={(e) => setStableName(e.target.value)}
        />
        <label>Description</label>
        <textarea
          rows="7"
          cols="20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="5**-***-***"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <div>
          <h1>Upload Stable Logo</h1>
          <UploadImages
            imgCount={1}
            imgType="Logo"
            onImageUrls={(urls) => handleLogoImageUrls(urls)}
            uploadFile={(imageUpload) =>
              uploadFile(imageUpload, logoImagesListRef)
            }
          />
          <h1>Upload All Stable Photos</h1>
          <UploadImages
            imgCount={10}
            imgType="All photos"
            onImageUrls={(urls) => handleAllPhotosImageUrls(urls)}
            uploadFile={(imageUpload) =>
              uploadFile(imageUpload, allPhotosImagesListRef)
            }
          />
        </div>
      </div>
      <button onClick={onSubmitHandler}>Submit</button>
    </div>
  );
};

export default AddStables;
