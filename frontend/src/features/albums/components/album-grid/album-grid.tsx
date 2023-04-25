import styles from "./album-grid.module.css";
import AlbumItem from "/src/features/albums/components/album-item/album-item";
import { Album } from "/src/features/albums/types";

interface Props {
  albums: Album[];
}

const AlbumGrid = ({ albums }: Props) => {
  return (
    <div className={styles.main}>
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
