import User from "../model/user.model.js";
import { throwErr } from "../utils/error.utils.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";

export const registerUserService = async (firstName, lastName, email, password) => {
  try {
    const prevUser = await User.findOne({ email });

    if (prevUser) return throwErr("User already exist with this email", 409);
    
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
};

export const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) return throwErr("Incorrect email or password!");

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) return throwErr("Incorrect email or password!");

    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
};
