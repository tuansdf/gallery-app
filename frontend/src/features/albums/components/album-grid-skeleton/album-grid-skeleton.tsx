import AlbumItemSkeleton from "@/features/albums/components/album-item-skeleton/album-item-skeleton";
import classes from "./album-grid-skeleton.module.css";

const AlbumGridSkeleton = () => {
  return (
    <div className={classes["album-grid-skeleton"]}>
      <AlbumItemSkeleton delayLevel={1} />
      <AlbumItemSkeleton delayLevel={2} />
      <AlbumItemSkeleton delayLevel={3} />
      <AlbumItemSkeleton delayLevel={4} />
      <AlbumItemSkeleton delayLevel={5} />
      <AlbumItemSkeleton delayLevel={6} />
      <AlbumItemSkeleton delayLevel={7} />
    </div>
  );
};

export default AlbumGridSkeleton;
