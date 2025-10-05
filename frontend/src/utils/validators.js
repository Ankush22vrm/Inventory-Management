export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUsername = (username) => {
  return username.length >= 3;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateNumber = (value) => {
  return !isNaN(value) && Number(value) >= 0;
};