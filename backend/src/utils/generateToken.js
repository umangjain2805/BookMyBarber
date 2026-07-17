import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });

  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE) || 30;

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: cookieExpireDays * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
