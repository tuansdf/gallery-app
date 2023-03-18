// password with at least 8 characters, at least
// 1 uppercase letter, 1 lowercase letter, 1 number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};
export const validatePassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};
