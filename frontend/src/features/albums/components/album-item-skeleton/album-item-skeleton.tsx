import Skeleton from "@/features/ui/skeleton/skeleton";
import classes from "./album-item-skeleton.module.css";

const EACH_DELAY_LEVEL = 0.15;

interface Props {
  delayLevel?: number;
}

const AlbumItemSkeleton = ({ delayLevel = 0 }: Props) => {
  return (
    <div
      className={classes["album-skeleton"]}
      style={{ animationDelay: delayLevel * EACH_DELAY_LEVEL + "s" }}
    >
      <Skeleton className={classes["image-skeleton"]}></Skeleton>
      <Skeleton className={classes["text-skeleton"]}></Skeleton>
    </div>
  );
};

export default AlbumItemSkeleton;
