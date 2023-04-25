import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import styles from "./image-detail-overlay.module.css";
import { Image } from "/src/features/images/image-types";
import {
  onCloseImage,
  onNextImage,
  onPrevImage,
  selectImageDetailIndex,
} from "/src/features/images/stores/images-slice";

interface Props {
  images: Image[];
}

const ImageDetailOverlay = ({ images }: Props) => {
  const dispatch = useDispatch();
  const imageDetailIndex = useSelector(selectImageDetailIndex);

  const currentImage = images[imageDetailIndex || 0];
  const onNext = () => {
    dispatch(onNextImage({}));
  };
  const onPrev = () => {
    dispatch(onPrevImage({}));
  };
  const onClose = () => {
    dispatch(onCloseImage({}));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop}></div>
      {/* content */}
      <div className={styles.content}>
        <button className={styles["change-image-btn"]} onClick={onPrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <img src={currentImage.imageUrl} className={styles.image} />
        <button className={styles["close-btn"]} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button className={styles["change-image-btn"]} onClick={onNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className={styles.info}>
        <h2 className={styles["info-name"]}>{currentImage.name}</h2>
        <section className={styles["info-section"]}>
          <div className={styles["info-title"]}>Album</div>
          <div>{currentImage.album.name}</div>
        </section>
        <section className={styles["info-section"]}>
          <div className={styles["info-title"]}>Uploaded</div>
          <div>
            {dayjs(currentImage.createdAt.toString()).format(
              "MMM DD, YYYY, h:mm:ss A"
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageDetailOverlay;
