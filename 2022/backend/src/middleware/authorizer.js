const authorizer = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user.userType;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denided." });
    }

    next();
  };
};

module.exports = authorizer;
