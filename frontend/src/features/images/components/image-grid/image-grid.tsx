import ImageItem from "@/features/images/components/image-item/image-item";
import { Image } from "@/features/images/types/image-types";
import classes from "./image-grid.module.css";

interface Props {
  images: Image[];
  onImageClick: (imageId: string) => void;
}

const ImageGrid = ({ images, onImageClick }: Props) => {
  return (
    <div className={classes["main"]}>
      {images.map((image) => (
        <ImageItem
          imageUrl={image.imageUrl}
          imageName={image.name}
          onClick={() => onImageClick(image.id)}
          key={image.id}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
