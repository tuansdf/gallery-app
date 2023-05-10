import { useInfiniteQuery } from "@tanstack/react-query";

import { Image } from "@/features/images/types/image-types";
import axiosInstance from "@/lib/axios";
import { PageResponse } from "@/types/global-types";

type AlbumId = string | undefined;

const IMAGES_EACH_TIME = 15;

export const getImages = async (
  albumId: AlbumId,
  pageNumber?: number
): Promise<PageResponse<Image[]>> => {
  if (!albumId) {
    throw new Error("Invalid album id");
  }
  const response = await axiosInstance.get(
    `/images?albumId=${albumId}&pageSize=${IMAGES_EACH_TIME}&pageNumber=${pageNumber}`
  );
  return response.data;
};

export const useGetInfiniteImagesQuery = (albumId: AlbumId) => {
  return useInfiniteQuery({
    queryKey: ["images", "album", albumId],
    queryFn: ({ pageParam = 0 }) => getImages(albumId, pageParam),
    enabled: Boolean(albumId),
    select: (data) => ({
      pages: data.pages.map((page) => page.content),
      pageParams: data.pageParams,
    }),
    getNextPageParam: (lastPage) => !lastPage.last && lastPage.number + 1,
  });
};
