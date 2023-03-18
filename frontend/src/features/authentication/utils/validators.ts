// password with at least 8 characters, at least
// 1 uppercase letter, 1 lowercase letter, 1 number
export const FormRegex = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export const validateEmail = (email: string): boolean => {
  return FormRegex.EMAIL.test(email);
};
export const validatePassword = (password: string): boolean => {
  return FormRegex.PASSWORD.test(password);
};
