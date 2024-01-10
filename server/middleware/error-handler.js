import {StatusCodes} from "http-status-codes";

const errorHandler = (err, req, res) => {
	const defaultError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong'
	}
	res.status(defaultError.statusCode).json({msg: defaultError})
}

export default errorHandler