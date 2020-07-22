const User = require('../models/userModels');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// routes

// register/signup

exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, mobileNumber, password, role } = req.body;
  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
    role,
  });

  //create token
  sendTokenResponse(user, 200, res);

  next();
});

// login/signin

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //validation email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please enter email id and password', 400));
  }
  //check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credential', 401));
  }
  //check if password matchs
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid password', 401));
  }
  //create token
  sendTokenResponse(user, 200, res);
});

//get token from model, create a cookie, send res
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 100
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    message: 'Succesful',
    token,
  });
};

// to see the logged user
exports.getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});
