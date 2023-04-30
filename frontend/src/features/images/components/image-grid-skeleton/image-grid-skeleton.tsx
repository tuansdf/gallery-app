import ImageItemSkeleton from "@/features/images/components/image-item-skeleton/image-item-skeleton";
import classes from "./image-grid-skeleton.module.css";

const ImageGridSkeleton = () => {
  return (
    <div className={classes["image-grid-skeleton"]}>
      <ImageItemSkeleton delayLevel={1} />
      <ImageItemSkeleton delayLevel={2} />
      <ImageItemSkeleton delayLevel={3} />
      <ImageItemSkeleton delayLevel={4} />
      <ImageItemSkeleton delayLevel={5} />
      <ImageItemSkeleton delayLevel={6} />
      <ImageItemSkeleton delayLevel={7} />
    </div>
  );
};

export default ImageGridSkeleton;
