import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import ChevronLeftIcon from "@/features/icons/chevron-left-icon";
import ChevronRightIcon from "@/features/icons/chevron-right-icon";
import XMarkIcon from "@/features/icons/x-mark-icon";
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
        <button className={classes["change-image-button"]} onClick={onPrev}>
          <ChevronLeftIcon className={classes["change-image-icon"]} />
        </button>
        <img src={currentImage.imageUrl} className={classes["image"]} />
        <button className={classes["close-button"]} onClick={onClose}>
          <XMarkIcon className={classes["close-icon"]} />
        </button>
        <button className={classes["change-image-button"]} onClick={onNext}>
          <ChevronRightIcon className={classes["change-image-icon"]} />
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
