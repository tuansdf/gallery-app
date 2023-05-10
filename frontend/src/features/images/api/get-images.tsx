import { useQuery } from "@tanstack/react-query";

import { Image } from "@/features/images/types/image-types";
import axiosInstance from "@/lib/axios";
import { PageResponse } from "@/types/global-types";

type AlbumId = string | undefined;

export const getImages = async (
  albumId: AlbumId
): Promise<PageResponse<Image[]>> => {
  if (!albumId) {
    throw new Error("Invalid album id");
  }
  const response = await axiosInstance.get(`/images?albumId=${albumId}`);
  return response.data;
};

export const useGetImagesQuery = (albumId: AlbumId) => {
  return useQuery({
    queryKey: ["images", "album", albumId],
    queryFn: () => getImages(albumId),
    enabled: Boolean(albumId),
    select: (data) => data.content,
  });
};
