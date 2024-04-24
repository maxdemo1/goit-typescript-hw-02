import React from "react";
import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  loadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMore }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => {
          loadMore();
        }}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
