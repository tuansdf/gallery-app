import { useContext, useEffect, useState } from "react";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { useGetAlbumsQuery } from "@/features/albums/api/get-albums";
import AlbumGridSkeleton from "@/features/albums/components/album-grid-skeleton/album-grid-skeleton";
import AlbumGrid from "@/features/albums/components/album-grid/album-grid";
import CreateAlbumForm from "@/features/albums/components/create-album-form/create-album-form";
import PlusIcon from "@/features/icons/plus-icon";
import XMarkIcon from "@/features/icons/x-mark-icon";
import { AppBarContext } from "@/features/menu/context/app-bar-provider";
import { useAppBarActions } from "@/features/menu/stores/app-bar-store";
import classes from "./index-page.module.css";

const IndexPage = () => {
  const { setTrailing } = useContext(AppBarContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setAppBarTitle } = useAppBarActions();

  const getAlbumsQuery = useGetAlbumsQuery();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setAppBarTitle("All album");
    setTrailing(
      <Button
        variant="text"
        shape="circle"
        color="secondary"
        onClick={openModal}
        className={classes["add-button"]}
      >
        <PlusIcon className={classes["add-icon"]} />
      </Button>
    );

    return () => {
      setAppBarTitle("");
      setTrailing(null);
    };
  }, []);

  return (
    <main className={classes["main"]}>
      {getAlbumsQuery.isLoading ? (
        <AlbumGridSkeleton />
      ) : getAlbumsQuery.isError ? (
        <Alert severity="error">Something went wrong!</Alert>
      ) : getAlbumsQuery.data ? (
        <AlbumGrid albums={getAlbumsQuery.data} />
      ) : null}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={classes["modal-header"]}>
          <h2 className={classes["modal-heading"]}>Create new album</h2>
          <Button
            color="secondary"
            shape="circle"
            size="small"
            variant="text"
            onClick={closeModal}
          >
            <XMarkIcon className={classes["modal-close-icon"]} />
          </Button>
        </div>
        <CreateAlbumForm onSuccess={closeModal} />
      </Modal>
    </main>
  );
};

export default IndexPage;
