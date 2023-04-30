import Skeleton from "@/features/ui/skeleton/skeleton";
import classes from "./image-item-skeleton.module.css";

const EACH_DELAY_LEVEL = 0.2;

interface Props {
  delayLevel?: number;
}

const ImageItemSkeleton = ({ delayLevel = 0 }: Props) => {
  return (
    <Skeleton
      className={classes["image-skeleton"]}
      style={{ animationDelay: delayLevel * EACH_DELAY_LEVEL + "s" }}
    ></Skeleton>
  );
};

export default ImageItemSkeleton;
