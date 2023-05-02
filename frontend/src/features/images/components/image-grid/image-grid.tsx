import ImageItem from "@/features/images/components/image-item/image-item";
import { Image } from "@/features/images/image-types";
import { onImageClick } from "@/features/images/stores/images-slice";
import { useDispatch } from "react-redux";
import classes from "./image-grid.module.css";

interface Props {
  images: Image[];
}

const ImageGrid = ({ images }: Props) => {
  const dispatch = useDispatch();

  const handleClick = (index: number) => {
    dispatch(onImageClick({ imageIndex: index }));
  };

  return (
    <div className={classes["main"]}>
      {images.map((image, i) => (
        <ImageItem
          imageUrl={image.imageUrl}
          imageName={image.name}
          onClick={() => handleClick(i)}
          key={image.id}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
