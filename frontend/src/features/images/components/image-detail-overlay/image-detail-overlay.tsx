import clsx from "clsx";
import dayjs from "dayjs";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";

import ChevronLeftIcon from "@/features/icons/chevron-left-icon";
import ChevronRightIcon from "@/features/icons/chevron-right-icon";
import ExclamationCircleIcon from "@/features/icons/exclamation-circle-icon";
import XMarkIcon from "@/features/icons/x-mark-icon";
import { Image } from "@/features/images/image-types";
import Backdrop from "@/features/ui/backdrop/backdrop";
import Button from "@/features/ui/button/button";
import classes from "./image-detail-overlay.module.css";

interface Props {
  images: Image[];
  onNext: () => void;
  onClose: () => void;
  onPrev: () => void;
  currentIndex: number;
  show: boolean;
}

const ImageDetailOverlay = ({
  images,
  onNext,
  onClose,
  onPrev,
  show,
  currentIndex,
}: Props) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const currentImage = images[currentIndex];

  if (!currentImage) return null;

  const imageCreatedDate = dayjs(currentImage.createdAt.toString()).format(
    "MMM DD, YYYY, h:mm:ss A"
  );

  const closeInfo = () => setIsInfoOpen(false);
  const toggleInfo = () => setIsInfoOpen((prev) => !prev);

  return (
    <AnimatePresence>
      {show ? (
        <m.div
          className={classes["overlay"]}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* left for main content */}
          <div className={classes["content"]}>
            <button
              className={clsx(
                classes["change-image-button"],
                classes["is-left"]
              )}
              onClick={onPrev}
            >
              <ChevronLeftIcon className={classes["change-image-icon"]} />
            </button>
            <img src={currentImage.imageUrl} className={classes["image"]} />
            <button
              className={clsx(
                classes["change-image-button"],
                classes["is-right"]
              )}
              onClick={onNext}
            >
              <ChevronRightIcon className={classes["change-image-icon"]} />
            </button>

            {/* left buttons */}
            <div>
              <button
                className={clsx(classes["func-button"], classes["is-left"])}
                onClick={onClose}
              >
                <XMarkIcon className={classes["func-icon"]} />
              </button>
            </div>
            {/* right buttons */}
            <div>
              <button
                className={clsx(classes["func-button"], classes["is-right"])}
                onClick={toggleInfo}
              >
                <ExclamationCircleIcon className={classes["func-icon"]} />
              </button>
            </div>
          </div>

          {/* right panel for info */}
          <Backdrop
            show={isInfoOpen}
            className={classes["info-backdrop"]}
            role="button"
            onClick={closeInfo}
          />
          <div
            className={clsx(classes["info"], {
              [classes["is-open"]]: isInfoOpen,
            })}
          >
            <Button
              shape="circle"
              color="secondary"
              variant="text"
              className={classes["info-close-button"]}
              onClick={closeInfo}
            >
              <XMarkIcon className={classes["func-icon"]} />
            </Button>
            <h2 className={classes["info-name"]}>{currentImage.name}</h2>
            <section className={classes["info-section"]}>
              <div className={classes["info-title"]}>Album</div>
              <div>{currentImage.album.name}</div>
            </section>
            <section className={classes["info-section"]}>
              <div className={classes["info-title"]}>Uploaded</div>
              <div>{imageCreatedDate}</div>
            </section>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ImageDetailOverlay;
