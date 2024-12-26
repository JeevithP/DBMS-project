import jwt from "jsonwebtoken";

export const generateToken = (res, user, role, message) => {
  const token = jwt.sign(
    { userId: user.id, role }, // Include the role in the token payload
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
    });
};
