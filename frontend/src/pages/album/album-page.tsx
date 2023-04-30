import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetAlbumQuery } from "@/features/albums/stores/albums-api-slice";
import ImageDetailOverlay from "@/features/images/components/image-detail-overlay/image-detail-overlay";
import ImageGrid from "@/features/images/components/image-grid/image-grid";
import UploadImage from "@/features/images/components/upload-image/upload-image";
import { Image } from "@/features/images/image-types";
import { useGetImagesQuery } from "@/features/images/stores/images-api-slice";
import {
  onFetchImagesSuccess,
  selectIsImageDetailOpening,
} from "@/features/images/stores/images-slice";
import Alert from "@/features/ui/alert/alert";
import classes from "./album-page.module.css";

type ImagesByMonth = {
  groupName: string;
  data: Image[];
};

const AlbumPage = () => {
  const { albumId } = useParams();

  const isImageDetailOpening = useSelector(selectIsImageDetailOpening);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (imagesData?.length) {
      dispatch(onFetchImagesSuccess({ lastImageIndex: imagesData.length - 1 }));
    }
  }, [imagesData]);

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

  if (albumIsLoading || imagesIsLoading)
    return <Alert severity="info">Loading...</Alert>;
  if (!albumData || !imagesData || albumIsError || imagesIsError)
    return <Alert severity="error">Something went wrong!</Alert>;

  return (
    <main className={classes["main"]}>
      <div className={classes["header"]}>
        <h1 className={classes["heading"]}>{albumData.name}</h1>
        <UploadImage albumId={albumId} />
      </div>

      {imagesByMonth?.map((byMonth) => {
        return (
          <div className={classes["section"]}>
            <div className={classes["section-title"]}>{byMonth.groupName}</div>
            <ImageGrid images={byMonth.data} />
          </div>
        );
      })}

      {isImageDetailOpening ? <ImageDetailOverlay images={imagesData} /> : null}
    </main>
  );
};

export default AlbumPage;
