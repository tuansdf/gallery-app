import styles from "./index-page.module.css";
import AlbumGrid from "/src/features/albums/components/album-grid/album-grid";
import { useGetAllAlbumsQuery } from "/src/features/albums/stores/albums-api-slice";

const IndexPage = () => {
  const { data, isLoading, isError } = useGetAllAlbumsQuery();

  if (!data) return;

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>All Albums</h1>
      <AlbumGrid albums={data} />
    </main>
  );
};

export default IndexPage;
