import { Album } from "@/features/albums/types/album-types";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getAlbum = async (albumId: string | undefined): Promise<Album> => {
  if (!albumId) {
    throw new Error("Invalid album id");
  }
  const response = await axiosInstance.get(`/albums/${albumId}`);
  return response.data;
};

export const useGetAlbumQuery = (albumId: string | undefined) => {
  return useQuery({
    queryKey: ["albums", albumId],
    queryFn: () => getAlbum(albumId),
    enabled: Boolean(albumId),
  });
};
