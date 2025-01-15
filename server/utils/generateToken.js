import jwt from "jsonwebtoken";

export const generateToken = (res, user, role, message) => {
    let currId=1;
    if(role=="student") currId=user.sid;
    else currId=user.cid;
  const token =  jwt.sign(
    { userId: currId, role }, // Include the role in the token payload
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )
  
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure:true
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
