import { CreateImageRequest, Image } from "@/features/images/types/image-types";
import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createImage = async (
  request: CreateImageRequest
): Promise<Image> => {
  const form = new FormData();
  form.append("image", request.image);
  form.append("albumId", request.albumId);
  const response = await axiosInstance.post(`/images`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
