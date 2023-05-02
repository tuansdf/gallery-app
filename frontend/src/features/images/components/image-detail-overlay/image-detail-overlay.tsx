import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import { Image } from "@/features/images/image-types";
import {
  onCloseImage,
  onNextImage,
  onPrevImage,
  selectImageDetailIndex,
} from "@/features/images/stores/images-slice";
import classes from "./image-detail-overlay.module.css";

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
    <div className={classes["overlay"]}>
      <div className={classes["backdrop"]}></div>
      {/* content */}
      <div className={classes["content"]}>
        <button className={classes["change-image-btn"]} onClick={onPrev}>
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
        <img src={currentImage.imageUrl} className={classes["image"]} />
        <button className={classes["close-btn"]} onClick={onClose}>
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
        <button className={classes["change-image-btn"]} onClick={onNext}>
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
      <div className={classes["info"]}>
        <h2 className={classes["info-name"]}>{currentImage.name}</h2>
        <section className={classes["info-section"]}>
          <div className={classes["info-title"]}>Album</div>
          <div>{currentImage.album.name}</div>
        </section>
        <section className={classes["info-section"]}>
          <div className={classes["info-title"]}>Uploaded</div>
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
