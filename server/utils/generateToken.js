import jwt from "jsonwebtoken";

export const generateToken = (res, user, role, message) => {
    let currId=1;
    if(role=="student") currId=user.sid;
    else currId=user.cid;
    
  const token = jwt.sign(
    { userId: currId, role }, // Include the role in the token payload
    "secret",
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
