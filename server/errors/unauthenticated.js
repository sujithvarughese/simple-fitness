import CustomAPIError from "./custom-api.js";
import {StatusCodes} from "http-status-codes";

// 401
class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED
	}
}

export default UnauthenticatedError