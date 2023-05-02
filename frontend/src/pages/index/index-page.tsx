import { useContext, useEffect, useState } from "react";

import AlbumGridSkeleton from "@/features/albums/components/album-grid-skeleton/album-grid-skeleton";
import AlbumGrid from "@/features/albums/components/album-grid/album-grid";
import CreateAlbumForm from "@/features/albums/components/create-album-form/create-album-form";
import { useGetAlbumsQuery } from "@/features/albums/stores/albums-api-slice";
import PlusIcon from "@/features/icons/plus-icon";
import XMarkIcon from "@/features/icons/x-mark-icon";
import { AppBarContext } from "@/features/menu/context/app-bar-provider";
import { setTitle } from "@/features/menu/stores/app-bar-store";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import Modal from "@/features/ui/modal/modal";
import { useDispatch } from "react-redux";
import classes from "./index-page.module.css";

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTrailing } = useContext(AppBarContext);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetAlbumsQuery();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(setTitle("All albums"));
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
      dispatch(setTitle(""));
      setTrailing(null);
    };
  }, []);

  return (
    <main className={classes["main"]}>
      {isLoading ? (
        <AlbumGridSkeleton />
      ) : isError ? (
        <Alert severity="error">Something went wrong!</Alert>
      ) : data ? (
        <AlbumGrid albums={data} />
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
