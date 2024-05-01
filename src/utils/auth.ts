const bcrypt = require("bcrypt");

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashed_password: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashed_password);
};
