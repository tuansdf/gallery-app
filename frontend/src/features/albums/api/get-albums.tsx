import { useQuery } from "@tanstack/react-query";

import { Album } from "@/features/albums/types/album-types";
import axiosInstance from "@/lib/axios";

export const getAlbums = async (): Promise<Album[]> => {
  const response = await axiosInstance.get("/albums");
  return response.data;
};

export const useGetAlbumsQuery = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });
};
