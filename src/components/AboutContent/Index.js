import React from "react";
// import { ref, getDownloadURL } from "firebase/storage";
// import { storage } from "../../firebase";
// import video from "./lisi-commercial.mp4";
import classes from "./AboutContent.module.css";

const AboutContent = () => {
  const testVideoURl =
    "https://firebasestorage.googleapis.com/v0/b/equestrian-app-e534c.appspot.com/o/lisi-commercial.mp4?alt=media&token=990797ff-7d2e-4faf-a640-769c48288c6c";
  //   const [videoURL, setVideoURL] = useState("");
  //   console.log(videoURL);
  //   useEffect(() => {
  //     const fetchVideoURL = async () => {
  //       try {
  //         const videoRef = ref(storage, "images/lisi-commercial.mp4");
  //         const url = await getDownloadURL(videoRef);
  //         setVideoURL(url);
  //       } catch (error) {
  //         console.error("Error fetching video URL:", error);
  //       }
  //     };

  //     fetchVideoURL();
  //   }, []);

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <h2>What you can see on this website</h2>
        <p>
          This is a site where you can follow equestrian events in Georgia 🏇,
          see planned tours 🗓️, and view details about stables 🏡 in one place.
          This project was created to make it easier and more pleasant for
          people who are interested in horse riding 🤠, whether they are
          beginners or already working in this field, to find various
          information. The site is working in test mode 🛠️, so some functions
          are temporarily unavailable ⚠️, but they will be launched soon 🔜.
        </p>
      </div>
      <video
        src={testVideoURl}
        width="450"
        autoPlay
        muted
        playsInline
        webkitPlaysInline
        loop
        className={classes.videoContainer}
      ></video>
    </div>
  );
};

export default AboutContent;
