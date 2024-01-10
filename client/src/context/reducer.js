import { initialState } from "./AuthContext.jsx";
import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	SET_IS_LOADING,
	SET_AUTH_STATE
} from "./actions.js";

const reducer = (state, action) => {
	if (action.type === REGISTER_USER) {
		return {
			...state,
			user: action.payload.user,
		};
	}
	if (action.type === LOGIN_USER) {
		return {
			...state,
			user: action.payload.user,
		};
	}
	if (action.type === LOGOUT_USER) {
		return {
			...initialState
		};
	}

	if (action.type === SET_IS_LOADING) {
		return {
			...state,
			isLoading: action.payload.isLoading
		}
	}
	if (action.type === SET_AUTH_STATE) {
		return {
			...state,
			authState: action.payload.authState
		}
	}
}

export default reducer