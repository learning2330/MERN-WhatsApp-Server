import { UserModel } from "../models/index.js";
import createHttpError from "http-errors";
import validator from "validator";

// enn variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  // chech if field are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all field.");
  }

  // chech name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your name is between 2 and 16 characters..."
    );
  }

  // chech status length
  if (status && status.length > 128) {
    throw createHttpError.BadRequest(
      "Please make sure your status is less then 128 characters"
    );
  }

  // check email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email address"
    );
  }

  // check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "Plsease try again with a different email address, This email address already exist..."
    );
  }

  // check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Plseas make sure you password is between 6 and 128 characters..."
    );
  }

  // hash password-->to be done in the user model

  // adding user to database
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();
  return user;
};
