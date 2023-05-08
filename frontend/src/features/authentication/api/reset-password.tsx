import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

export type ResetPasswordResponse = {
  message: string;
};

export type ResetPasswordRequest = {
  password: string;
  token: string;
};

export const resetPassword = async (
  request: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await axiosInstance.post("/auth/reset-password", request);
  return response.data;
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (request: ResetPasswordRequest) => resetPassword(request),
  });
};
