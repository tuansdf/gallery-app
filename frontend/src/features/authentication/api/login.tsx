import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};
export type Token = {
  token: string;
};
export type LoginResponse = User & Token;

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", request);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
  });
};
