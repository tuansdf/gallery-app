import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Album } from "@/features/albums/types/album-types";
import axiosInstance from "@/lib/axios";

export type CreateAlbumRequest = {
  name: string;
};

export type CreateAlbumResponse = Album;

export const createAlbum = async (
  request: CreateAlbumRequest
): Promise<CreateAlbumResponse> => {
  const response = await axiosInstance.post("/albums", request);
  return response.data;
};

export const useCreateAlbumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateAlbumRequest) => createAlbum(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });
};
