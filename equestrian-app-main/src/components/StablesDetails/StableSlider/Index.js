import React, { useState, useCallback } from "react";
import Carousel from "react-elastic-carousel";
import ImageViewer from "react-simple-image-viewer"; // Import ImageViewer
import classes from "./StableSlider.module.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const StableSlider = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  // Check if data is available
  if (!data || !data.all_photos_images || data.all_photos_images.length === 0) {
    return <div>No images available</div>;
  }

  const stableImages = data.all_photos_images;

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        {stableImages.map((imageUrl, index) => (
          <div
            key={index}
            className={classes.imageContainer}
            onClick={() => openImageViewer(index)} // Open image viewer on click
          >
            <img
              src={imageUrl}
              alt={`Stable ${index + 1}`}
              className={classes.carouselImage}
            />
          </div>
        ))}
      </Carousel>

      {isViewerOpen && (
        <ImageViewer
          src={stableImages}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default StableSlider;
