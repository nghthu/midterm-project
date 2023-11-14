import "dotenv/config";

// Error message
export const ERROR_INVALID_INPUT = "Invalid Input";
export const ERROR_EMAIL_ALREADY_EXISTS = "Email Already Exists";
export const ERROR_UNKNOWN = "Unknown Error Occurs";
export const ERROR_WRONG_CREDENTIALS = "No User Found For This Email/Password";
export const ERROR_BAD_REQUEST = "Bad Request";
export const ERROR_REQUIRE_ALL_FIELDS = "Require All Fields To Be Sent";
export const ERROR_FULLNAME_NOT_EMPTY = "Fullname is not allowed to be empty";
export const ERROR_EMAIL_NOT_EMPTY = "Email is not allowed to be empty";
export const ERROR_TEL_NOT_EMPTY = "Phone number is not allowed to be empty";
export const ERROR_PASSWORD_NOT_EMPTY = "Password is not allowed to be empty";

// Success message
export const MESSAGE_SIGNUP_SUCCESSFULLY = "Sign Up Successfully!";
export const MESSAGE_LOGOUT_SUCCESSFULLY = "Logout Successfully!";

export const JWT_ERROR_TOKEN_EXPIRED = "TokenExpiredError";
export const SALT_ROUNDS = 10;

export const { DATABASE_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;
