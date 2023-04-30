import { ImgHTMLAttributes } from "react";

import classes from "./image-item.module.css";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  imageUrl: string;
  imageName: string;
}

const ImageItem = ({ imageUrl, imageName, ...restProps }: Props) => {
  return (
    <img
      src={imageUrl}
      loading="lazy"
      alt={imageName}
      className={classes["img"]}
      {...restProps}
    />
  );
};

export default ImageItem;
