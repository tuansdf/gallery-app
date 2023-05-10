import { useContext, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import Alert from "@/components/alert/alert";
import ScreenLoader from "@/components/screen-loader/screen-loader";
import Skeleton from "@/components/skeleton/skeleton";
import { useGetAlbumQuery } from "@/features/albums/api/get-album";
import { useGetInfiniteImagesQuery } from "@/features/images/api/get-images";
import ImageDetailOverlay from "@/features/images/components/image-detail-overlay/image-detail-overlay";
import ImageGridSkeleton from "@/features/images/components/image-grid-skeleton/image-grid-skeleton";
import ImageGrid from "@/features/images/components/image-grid/image-grid";
import UploadImage from "@/features/images/components/upload-image/upload-image";
import {
  useImageDetailActions,
  useIsImageDetailOpening,
} from "@/features/images/stores/image-detail-store";
import { useIsUploadingImage } from "@/features/images/stores/upload-image-store";
import { makeImagesByMonth } from "@/features/images/utils/make-images-by-month";
import { AppBarContext } from "@/features/menu/context/app-bar-provider";
import { useAppBarActions } from "@/features/menu/stores/app-bar-store";
import classes from "./album-page.module.css";

const AlbumPage = () => {
  const observerStickRef = useRef<HTMLDivElement>(null);

  const { setTrailing } = useContext(AppBarContext);

  const { albumId } = useParams();

  const isUploadingImage = useIsUploadingImage();
  const isImageDetailOpening = useIsImageDetailOpening();
  const { fetchingImagesSuccessful, openImage } = useImageDetailActions();
  const { setAppBarTitle } = useAppBarActions();

  if (!albumId) return <Alert severity="info">Something went wrong!</Alert>;

  const getAlbumQuery = useGetAlbumQuery(albumId);
  const getImagesQuery = useGetInfiniteImagesQuery(albumId);

  const images = getImagesQuery.data?.pages.flat();

  const imagesByMonth = useMemo(() => {
    if (!images?.length) return [];
    return makeImagesByMonth(images);
  }, [images]);

  const handleImageClick = (imageId: string) => {
    if (!images) return null;

    const imagesLength = images.length;
    let clickedImageIndex = 0;
    for (let i = 0; i < imagesLength; i++) {
      if (images[i].id === imageId) {
        clickedImageIndex = i;
        break;
      }
    }

    openImage(clickedImageIndex);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (getImagesQuery.hasNextPage) {
            getImagesQuery.fetchNextPage();
          }
        }
      });
    });

    if (observerStickRef.current) observer.observe(observerStickRef.current);

    return () => {
      if (observerStickRef.current)
        observer.unobserve(observerStickRef.current);
    };
  }, [observerStickRef, getImagesQuery.hasNextPage]);

  useEffect(() => {
    if (images?.length) {
      fetchingImagesSuccessful(images.length - 1);
    }
  }, [images]);

  useEffect(() => {
    if (getAlbumQuery.data?.name) {
      setAppBarTitle(getAlbumQuery.data.name);
    }
    setTrailing(<UploadImage albumId={albumId} />);
  }, [getAlbumQuery.data]);

  return (
    <main className={classes["main"]}>
      {imagesByMonth?.length
        ? imagesByMonth?.map((byMonth) => {
            return (
              <div className={classes["section"]} key={byMonth.groupName}>
                <div className={classes["section-title"]}>
                  {byMonth.groupName}
                </div>
                <ImageGrid
                  images={byMonth.data}
                  onImageClick={handleImageClick}
                />
              </div>
            );
          })
        : null}
      {getImagesQuery.isFetching ? (
        <div className={classes["section-skeleton"]}>
          <Skeleton className={classes["month-name-skeleton"]} />
          <ImageGridSkeleton />
        </div>
      ) : null}

      {getImagesQuery.error ? (
        <Alert severity="error">Something went wrong!</Alert>
      ) : null}

      {!isImageDetailOpening && (
        <div ref={observerStickRef} className={classes["observer-stick"]}></div>
      )}
      <ImageDetailOverlay
        show={isImageDetailOpening && !!getImagesQuery.data}
        images={images || []}
        albumName={getAlbumQuery.data?.name || ""}
      />
      <ScreenLoader show={isUploadingImage} />
    </main>
  );
};

export default AlbumPage;
