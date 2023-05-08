import AlbumItem from "@/features/albums/components/album-item/album-item";
import { Album } from "@/features/albums/types/album-types";
import classes from "./album-grid.module.css";

interface Props {
  albums: Album[];
}

const AlbumGrid = ({ albums }: Props) => {
  return (
    <div className={classes["main"]}>
      {albums.map((album) => (
        <AlbumItem
          key={album.id}
          name={album.name}
          imageUrl={album.imageUrl}
          href={`/albums/${album.id}`}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;
