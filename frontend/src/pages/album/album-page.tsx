import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./album-page.module.css";
import { useGetAlbumQuery } from "/src/features/albums/stores/albums-api-slice";
import ImageDetailOverlay from "/src/features/images/components/image-detail-overlay/image-detail-overlay";
import ImageGrid from "/src/features/images/components/image-grid/image-grid";
import UploadImage from "/src/features/images/components/upload-image/upload-image";
import { useGetImagesQuery } from "/src/features/images/stores/images-api-slice";
import {
  onFetchImagesSuccess,
  selectIsImageDetailOpening,
} from "/src/features/images/stores/images-slice";
import Alert from "/src/features/ui/alert/alert";

const AlbumPage = () => {
  const { albumId } = useParams();

  const isImageDetailOpening = useSelector(selectIsImageDetailOpening);
  const dispatch = useDispatch();

  if (!albumId) return <Alert variant="info">Something went wrong!</Alert>;

  const {
    data: albumData,
    isLoading: albumIsLoading,
    isError: albumIsError,
  } = useGetAlbumQuery(albumId || "");
  const {
    data: imagesData,
    isLoading: imagesIsLoading,
    isError: imagesIsError,
    isSuccess: imagesIsSuccess,
  } = useGetImagesQuery(albumId || "");

  useEffect(() => {
    if (imagesData?.length) {
      dispatch(onFetchImagesSuccess({ lastImageIndex: imagesData.length - 1 }));
    }
  }, [imagesData]);

  if (albumIsLoading || imagesIsLoading)
    return <Alert variant="info">Loading...</Alert>;
  if (!albumData || !imagesData || albumIsError || imagesIsError)
    return <Alert variant="danger">Something went wrong!</Alert>;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{albumData.name}</h1>
        <UploadImage albumId={albumId} />
      </div>

      <ImageGrid images={imagesData} />

      {isImageDetailOpening ? <ImageDetailOverlay images={imagesData} /> : null}
    </main>
  );
};

export default AlbumPage;
