import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type ChangePasswordResponse = {
  message: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async (
  request: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.patch("/auth/password", request);
  return response.data;
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) => changePassword(request),
  });
};
