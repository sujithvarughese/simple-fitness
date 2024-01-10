import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import { attachCookies, createJWT } from "../utils/index.js";

const register = async (req, res) => {
	// destructure fields from request body
	const { lastName, firstName, email, password } = req.body;

	// if any fields missing from user front end, throw error
	if (!lastName || !firstName || !email || !password) {
		throw new BadRequestError("Please provide all values");
	}

	// validate that user not already in database
	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError("User already exists");
	}
	// first registered user is admin
	const isFirstUser = (await User.countDocuments({})) === 0;
	// create new user in mongodb
	const user = await User.create({ lastName, firstName, email, password, isAdmin: isFirstUser });

	// userInfo variable with just the fields we want to send for token
	const userInfo = { userID: user._id, isAdmin: user.isAdmin };

	// create jwt with jwt.sign
	const token = createJWT({ payload: userInfo });
	// create cookie in the response, where we attach token
	attachCookies({ res, token });

	// send response JSON to include user fields
	res.status(StatusCodes.CREATED).json({
		message: "user registered",
		user: userInfo
	});
}

const login = async (req, res) => {
	// destructure login obj sent from front end
	const { email, password } = req.body;

	// if any fields missing from user front end, throw error
	if (!email || !password) {
		throw new BadRequestError("please provide email and password");
	}

	// check User model in database for entered email
	// select('+password') needed since password property in User is hidden
	const user = await User.findOne({ email }).select("+password").populate("favorites");
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	// verify entered password using function we created in User.js
	// to compare with this.password
	const passwordVerified = await user.comparePassword(password);
	if (!passwordVerified) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	const { _id, isAdmin, favorites } = user

	// user variable with just the fields we want to send
	const userInfo = { userID: _id, isAdmin: isAdmin };

	// create jwt with jwt.sign
	const token = createJWT({ payload: userInfo });

	// create cookie in the response, where we attach token
	attachCookies({ res, token });

	res.status(StatusCodes.OK).json({
		message: "user logged in success",
		user: userInfo,
		favorites: favorites
	});
}

const logout = async (req, res) => {
	// change token name to anything, then expire it
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now())
	});

	res.status(StatusCodes.OK).json({ message: "user logged out" });
}

export { register, login, logout }