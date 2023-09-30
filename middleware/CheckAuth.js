import jwt from "jsonwebtoken";
export const authentication = (req, res, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = decoded;
  } catch (error) {
    return res.render("errors/700");
  }
  next();
};
