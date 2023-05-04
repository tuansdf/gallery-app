export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = UserLogin & {
  token: string;
};

export type UserLogin = {
  firstName: string;
  lastName: string;
  email: string;
};
export type WithToken = {
  token: string;
};
export type UserLoginWithToken = UserLogin & WithToken;

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  password: string;
  token: string;
};

export type VerifyEmailRequest = {
  token: string;
};

export type ChangePasswordRequest = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
