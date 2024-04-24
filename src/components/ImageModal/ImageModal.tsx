import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";
import React from "react";
import { ImageData } from "../../types";

ReactModal.setAppElement("#root");

interface ImageModalProps {
  dataModal: ImageData;
  openState: boolean;
  modalClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  dataModal,
  openState,
  modalClose,
}) => {
  return (
    <div>
      <ReactModal
        isOpen={openState}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          modalClose();
        }}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <img
          src={dataModal.urls.full}
          alt={dataModal.description}
          className={styles.modalImage}
        />
      </ReactModal>
    </div>
  );
};

export default ImageModal;
