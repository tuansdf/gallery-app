import dayjs from "dayjs";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useGetAlbumQuery } from "@/features/albums/stores/albums-api-slice";
import ImageDetailOverlay from "@/features/images/components/image-detail-overlay/image-detail-overlay";
import ImageGridSkeleton from "@/features/images/components/image-grid-skeleton/image-grid-skeleton";
import ImageGrid from "@/features/images/components/image-grid/image-grid";
import UploadImage from "@/features/images/components/upload-image/upload-image";
import { Image } from "@/features/images/image-types";
import {
  useCurrentOpeningImageIndex,
  useImageDetailActions,
  useIsImageDetailOpening,
} from "@/features/images/stores/image-detail-store";
import { useGetImagesQuery } from "@/features/images/stores/images-api-slice";
import { AppBarContext } from "@/features/menu/context/app-bar-provider";
import { useAppBarActions } from "@/features/menu/stores/app-bar-store";
import Alert from "@/features/ui/alert/alert";
import Skeleton from "@/features/ui/skeleton/skeleton";
import classes from "./album-page.module.css";

type ImagesByMonth = {
  groupName: string;
  data: Image[];
};

const AlbumPage = () => {
  const { setTrailing } = useContext(AppBarContext);

  const { albumId } = useParams();

  const isImageDetailOpening = useIsImageDetailOpening();
  const currentOpeningImageIndex = useCurrentOpeningImageIndex();
  const { nextImage, closeImage, previousImage, fetchingImagesSuccessful } =
    useImageDetailActions();
  const { setAppBarTitle } = useAppBarActions();

  if (!albumId) return <Alert severity="info">Something went wrong!</Alert>;

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

  const convertToImagesByMonth = (images: Image[]) => {
    const getMonthYear = (date: Date) => {
      return dayjs(date).format("MMMM YYYY");
    };

    if (!images.length) return;
    let currentGroupMonth = getMonthYear(images[0].createdAt);

    const result: ImagesByMonth[] = [];
    result.push({ groupName: currentGroupMonth, data: [] });

    for (const image of images) {
      const currentMonth = getMonthYear(image.createdAt);
      if (currentMonth !== currentGroupMonth) {
        currentGroupMonth = currentMonth;
        result.push({ groupName: currentGroupMonth, data: [] });
      }
      result[result.length - 1].data.push(image);
    }

    return result;
  };

  const imagesByMonth = useMemo(() => {
    if (!imagesData?.length) return [];
    return convertToImagesByMonth(imagesData);
  }, [imagesData]);

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
    if (imagesData?.length) {
      fetchingImagesSuccessful(imagesData.length - 1);
    }
  }, [imagesData]);

  useEffect(() => {
    if (albumData?.name) {
      setAppBarTitle(albumData.name);
    }
    setTrailing(<UploadImage albumId={albumId} />);
  }, [albumData]);

  return (
    <main className={classes["main"]}>
      {imagesIsLoading ? (
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
      ) : imagesIsError ? (
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
        show={isImageDetailOpening && !!imagesData}
        images={imagesData || []}
        onClose={handleCloseImageClick}
        onNext={handleNextImageClick}
        onPrev={handlePrevImageClick}
        currentIndex={currentOpeningImageIndex || 0}
      />
    </main>
  );
};

export default AlbumPage;
