import ImageItem from "@/features/images/components/image-item/image-item";
import { useImageDetailActions } from "@/features/images/stores/image-detail-store";
import { Image } from "@/features/images/types/image-types";
import classes from "./image-grid.module.css";

interface Props {
  images: Image[];
}

const ImageGrid = ({ images }: Props) => {
  const { openImage } = useImageDetailActions();

  const handleClick = (index: number) => {
    openImage(index);
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
