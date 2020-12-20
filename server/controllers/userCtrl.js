const Users = require("../models/userModel");
const httpError = require("../middlewares/http-error");
const bcrypt = require("bcrypt");

const {
  createAccessToken,
  createRefreshToken,
} = require("../helpers/createToken");

exports.userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await Users.findOne({ email });

    if (user) return next(new httpError("The email already exists"), 400);

    if (password.length < 6) {
      return next(new httpError("Password is at least 6 characters long"));
    }

    //password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({ name, email, password: hashedPassword });

    //save to mongodb
    await newUser.save();

    //create token
    const token = createAccessToken({ id: newUser._id, email: newUser.email });
    console.log(token, "tttttttttt");
    const refreshToken = createRefreshToken({
      id: newUser._id,
      email: newUser.email,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 360000,
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({
      status: "success",
      msg: "User has been successfully registered",
      user: newUser,
      token,
    });
  } catch (err) {
    console.log(err);
    return next(new httpError("Something went wrong, please try again"), 500);
  }
};

exports.loginUser = async (req, res, next) => {
  const data = req.body;

  const { email, password } = data;

  let existingUser;
  try {
    existingUser = await Users.findOne({ email: email });
  } catch (err) {
    return next(new httpError("Could not login, please try again later", 500));
  }

  if (!existingUser) {
    return next(new httpError("Invalid credentials could not log you in", 401));
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new httpError(
        "Could not log you in, please check your credentials and try again."
      ),
      500
    );
  }

  if (!isValidPassword) {
    return next(new httpError("Invalid credentials could not log you in", 401));
  }

  let token;
  try {
    token = await createAccessToken({
      userId: existingUser.id,
      email: existingUser.email,
    });
  } catch (err) {
    return next(new httpError("Could not login, please try again", 500));
  }

  res.cookie("token", token, { maxAge: 1000000, httpOnly: true });
  req.user = existingUser;

  res.status(200).json({
    status: "success",
    message: "Logged in",
    user: existingUser,
    token: token,
  });
};

exports.logout = (req, res, next) => {
  try {
    res.clearCookie("token", (path = "/user/refresh_token"));

    return res.json({
      status: "success",
      msg: "Logged out",
    });
  } catch (err) {
    return next(new httpError("Could not login, please try again", 500));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.userId).select("-password");

    if (!user) return res.status(500).json({ msg: err.message });

    res.json(user);
  } catch (err) {
    return next(new httpError(err.message, 500));
  }
};
