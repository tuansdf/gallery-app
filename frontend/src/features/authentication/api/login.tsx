import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  LoginRequest,
  LoginResponse,
} from "@/features/authentication/types/auth-types";

const login = (data: LoginRequest): Promise<LoginResponse> => {
  return axios.post("/auth/login", data);
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });
};
