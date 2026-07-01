export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if user is logged in and has one of the allowed roles
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};
