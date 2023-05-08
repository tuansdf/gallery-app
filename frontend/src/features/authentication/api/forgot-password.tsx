import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export const forgotPassword = async (
  request: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const response = await axiosInstance.post("/auth/forgot-password", request);
  return response.data;
};

export const useForgotPasswordMutatioin = () => {
  return useMutation({
    mutationFn: (request: ForgotPasswordRequest) => forgotPassword(request),
  });
};
