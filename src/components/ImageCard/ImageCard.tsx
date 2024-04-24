import { ImageData, openModalFunc } from "../../types";
import styles from "./ImageCard.module.css";
import React from "react";

interface ImageCardProps {
  imageItem: ImageData;
  handleOpenModal: openModalFunc;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageItem,
  handleOpenModal,
}) => {
  return (
    <li className={styles.imageListItem} data-id={imageItem.id}>
      <img
        onClick={() => handleOpenModal(imageItem)}
        className={styles.image}
        src={imageItem.urls.small}
        alt={imageItem.description}
      />
    </li>
  );
};

export default ImageCard;
