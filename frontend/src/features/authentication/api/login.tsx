import { useMutation } from "@tanstack/react-query";

import {
  LoginRequest,
  LoginResponse,
} from "@/features/authentication/types/auth-types";
import axiosInstance from "@/lib/axios";

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", request);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
  });
};
