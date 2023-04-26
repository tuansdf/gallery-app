import { ImgHTMLAttributes } from "react";

import styles from "./image-item.module.css";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  imageUrl: string;
  imageName: string;
}

const ImageItem = ({ imageUrl, imageName, ...rest }: Props) => {
  return (
    <img
      src={imageUrl}
      loading="lazy"
      alt={imageName}
      className={styles.main}
      {...rest}
    />
  );
};

export default ImageItem;
