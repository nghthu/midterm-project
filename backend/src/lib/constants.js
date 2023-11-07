export const ERROR_INVALID_INPUT = "Invalid Input";
export const ERROR_EMAIL_ALREADY_EXISTS = "Email Already Exists";
export const ERROR_WRONG_EMAIL = "Wrong Email/Email Does Not Exist";
export const ERROR_WRONG_PASSWORD = "Wrong Password";
export const MESSAGE_SIGNUP_SUCCESSFULLY = "Sign Up Successfully";
export const JWT_ERROR_TOKEN_EXPIRED = "TokenExpiredError";
export const SALT_ROUNDS = 10;

export const { DB_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;
