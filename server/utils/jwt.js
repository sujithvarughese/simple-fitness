import jwt from 'jsonwebtoken'

// create signed token during register and login to attach to cookie
const createJWT = ({ payload }) => {
	return jwt.sign(
		payload,
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
}

// current user must be authenticated with token from cookies
const validateJWT = ({ token }) => {
	return jwt.verify(token, process.env.JWT_SECRET)
}

export { createJWT, validateJWT }