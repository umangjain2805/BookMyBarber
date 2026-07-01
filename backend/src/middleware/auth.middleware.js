import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  // 1) Getting token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in. Please log in to get access.'
    });
  }

  try {
    // 2) Verification of token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Attach user data to request (id, role, etc.)
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token or token has expired. Please log in again.'
    });
  }
};
