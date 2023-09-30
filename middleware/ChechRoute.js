export const checkroutes = (req, res, next) => {
  if (!req.route) {
    return res.render("errors/404");
  }
  next();
};
