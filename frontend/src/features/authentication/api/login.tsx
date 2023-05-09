import { useMutation } from "@tanstack/react-query";

import { User } from "@/features/authentication/types/auth-types";
import axiosInstance from "@/lib/axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  refreshToken: string;
  accessToken: string;
};

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", request);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
  });
};
