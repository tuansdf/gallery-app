import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export const register = async (
  request: RegisterRequest
): Promise<RegisterRequest> => {
  const response = await axiosInstance.post("/auth/register", request);
  return response.data;
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (request: RegisterRequest) => register(request),
  });
};
