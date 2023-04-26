import { useDispatch } from "react-redux";
import styles from "./image-grid.module.css";
import ImageItem from "/src/features/images/components/image-item/image-item";
import { Image } from "/src/features/images/image-types";
import { onImageClick } from "/src/features/images/stores/images-slice";

interface Props {
  images: Image[];
}

const ImageGrid = ({ images }: Props) => {
  const dispatch = useDispatch();

  const handleClick = (index: number) => {
    dispatch(onImageClick({ imageIndex: index }));
  };

  return (
    <div className={styles["main"]}>
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
