import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Image } from "@/features/images/types/image-types";
import axiosInstance from "@/lib/axios";

export type CreateImageRequest = {
  albumId: string;
  image: File;
};

export type CreateImageResponse = Image;

export const createImage = async (
  request: CreateImageRequest
): Promise<CreateImageResponse> => {
  const response = await axiosInstance.postForm(`/images`, request);
  return response.data;
};

export const useCreateImageMutation = (albumId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateImageRequest) => createImage(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images", "album", albumId] });
    },
  });
};
