import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

export type VerifyEmailResponse = {
  message: string;
};

export type VerifyEmailRequest = {
  token: string;
};

export const verifyEmail = async (
  request: VerifyEmailRequest
): Promise<VerifyEmailResponse> => {
  const response = await axiosInstance.post("/auth/verify-email", request);
  return response.data;
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (request: VerifyEmailRequest) => verifyEmail(request),
  });
};
