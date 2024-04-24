import React from "react";
import { ImageData, openModalFunc } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  itemsList: ImageData[];
  handleOpenModal: openModalFunc;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  itemsList,
  handleOpenModal,
}) => {
  return (
    <ul className={styles.imagesList}>
      {itemsList.map((item) => {
        return (
          <ImageCard
            imageItem={item}
            key={item.id}
            handleOpenModal={handleOpenModal}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
