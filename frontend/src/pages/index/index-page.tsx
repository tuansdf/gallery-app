import { useState } from "react";
import styles from "./index-page.module.css";
import AlbumGrid from "/src/features/albums/components/album-grid/album-grid";
import CreateAlbumForm from "/src/features/albums/components/create-album-form/create-album-form";
import { useGetAllAlbumsQuery } from "/src/features/albums/stores/albums-api-slice";
import Alert from "/src/features/ui/alert/alert";
import Modal from "/src/features/ui/modal/modal";

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllAlbumsQuery();

  if (isLoading) return <Alert variant="info">Loading...</Alert>;
  if (!data || isError)
    return <Alert variant="danger">Something went wrong!</Alert>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>All Albums</h1>
        <button onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </button>
      </div>
      <AlbumGrid albums={data} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className={styles["modal-heading"]}>Create new album</h2>
        <CreateAlbumForm onSuccess={closeModal} />
      </Modal>
    </main>
  );
};

export default IndexPage;
