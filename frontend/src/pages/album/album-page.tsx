import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import Alert from "@/components/alert/alert";
import Skeleton from "@/components/skeleton/skeleton";
import { useGetAlbumQuery } from "@/features/albums/api/get-album";
import { useGetImagesQuery } from "@/features/images/api/get-images";
import ImageDetailOverlay from "@/features/images/components/image-detail-overlay/image-detail-overlay";
import ImageGridSkeleton from "@/features/images/components/image-grid-skeleton/image-grid-skeleton";
import ImageGrid from "@/features/images/components/image-grid/image-grid";
import UploadImage from "@/features/images/components/upload-image/upload-image";
import {
  useCurrentOpeningImageIndex,
  useImageDetailActions,
  useIsImageDetailOpening,
} from "@/features/images/stores/image-detail-store";
import { makeImagesByMonth } from "@/features/images/utils/make-images-by-month";
import { AppBarContext } from "@/features/menu/context/app-bar-provider";
import { useAppBarActions } from "@/features/menu/stores/app-bar-store";
import classes from "./album-page.module.css";

const AlbumPage = () => {
  const { setTrailing } = useContext(AppBarContext);

  const { albumId } = useParams();

  const isImageDetailOpening = useIsImageDetailOpening();
  const currentOpeningImageIndex = useCurrentOpeningImageIndex();
  const { nextImage, closeImage, previousImage, fetchingImagesSuccessful } =
    useImageDetailActions();
  const { setAppBarTitle } = useAppBarActions();

  if (!albumId) return <Alert severity="info">Something went wrong!</Alert>;

  const getAlbumQuery = useGetAlbumQuery(albumId);
  const getImagesQuery = useGetImagesQuery(albumId);

  const imagesByMonth = useMemo(() => {
    if (!getImagesQuery.data?.length) return [];
    return makeImagesByMonth(getImagesQuery.data);
  }, [getImagesQuery.data]);

  const handleNextImageClick = () => {
    previousImage();
  };
  const handlePrevImageClick = () => {
    nextImage();
  };
  const handleCloseImageClick = () => {
    closeImage();
  };

  useEffect(() => {
    if (getImagesQuery.data?.length) {
      fetchingImagesSuccessful(getImagesQuery.data.length - 1);
    }
  }, [getImagesQuery.data]);

  useEffect(() => {
    if (getAlbumQuery.data?.name) {
      setAppBarTitle(getAlbumQuery.data.name);
    }
    setTrailing(<UploadImage albumId={albumId} />);
  }, [getAlbumQuery.data]);

  return (
    <main className={classes["main"]}>
      {getImagesQuery.isLoading ? (
        <>
          <div className={classes["section-skeleton"]}>
            <Skeleton className={classes["month-name-skeleton"]} />
            <ImageGridSkeleton />
          </div>
          <div className={classes["section-skeleton"]}>
            <Skeleton className={classes["month-name-skeleton"]} />
            <ImageGridSkeleton />
          </div>
        </>
      ) : getImagesQuery.error ? (
        <Alert severity="error">Something went wrong!</Alert>
      ) : imagesByMonth?.length ? (
        imagesByMonth?.map((byMonth) => {
          return (
            <div className={classes["section"]} key={byMonth.groupName}>
              <div className={classes["section-title"]}>
                {byMonth.groupName}
              </div>
              <ImageGrid images={byMonth.data} />
            </div>
          );
        })
      ) : null}

      <ImageDetailOverlay
        show={isImageDetailOpening && !!getImagesQuery.data}
        images={getImagesQuery.data || []}
        onClose={handleCloseImageClick}
        onNext={handleNextImageClick}
        onPrev={handlePrevImageClick}
        currentIndex={currentOpeningImageIndex || 0}
      />
    </main>
  );
};

export default AlbumPage;
