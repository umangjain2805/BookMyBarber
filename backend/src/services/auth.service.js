import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const registerUser = async (userData) => {
  const { name, email, password, phone, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password, // hashed by the User Schema pre-save hook
    phone,
    role,
  });

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export { registerUser, loginUser };