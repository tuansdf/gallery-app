export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
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
