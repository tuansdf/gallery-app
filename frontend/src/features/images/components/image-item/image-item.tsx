import { ImgHTMLAttributes } from "react";

import styles from "./image-item.module.css";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  imageUrl: string;
}

const ImageItem = ({ imageUrl, ...rest }: Props) => {
  return (
    <img src={imageUrl} loading="lazy" className={styles.main} {...rest} />
  );
};

export default ImageItem;
