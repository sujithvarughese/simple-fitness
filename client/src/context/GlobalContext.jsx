import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";

import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	SET_IS_LOADING,
	SET_AUTH_STATE,
	SHOW_REGISTER_MODAL,
	SET_FAVORITES
} from "./actions.js";
import connect from '../utils/connect.js'

const initialState = {
	user: null,
	isLoading: false,
	authState: "",
	favorites: [],
	showRegisterModal: false
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const register = async (credentials) => {
		try {
			const response = await connect.post("/auth/register", credentials)
			// user = { userID: _id, isAdmin: isAdmin }
			const { user } = response.data
			dispatch({
				type: REGISTER_USER,
				payload: { user }
			})

		} catch (error) {
			console.log(error);
		}
	}

	const setShowRegisterModal = () => {
		dispatch({
			type: SHOW_REGISTER_MODAL
		})
	}
	const login = async (credentials) => {
		try {
			const response = await connect.post("/auth/login", credentials)
			const { user, favorites } = response.data
			dispatch({
				type: LOGIN_USER,
				payload: { user, favorites }
			})
		} catch (error) {
			console.log(error);
		}
	}
	const logout = async () => {
		await connect("/auth/logout");
		dispatch({ type: LOGOUT_USER });
	}

	const setIsLoading = (bool) => {
		dispatch({
			type: SET_IS_LOADING,
			payload: { isLoading: bool }
		})
	}

	const setAuthState = (authState) => {
		dispatch({
			type: SET_AUTH_STATE,
			payload: { authState: authState }
		})
	}

	const setFavorites = (favorites) => {
		dispatch({
			type: SET_FAVORITES,
			payload: { favorites: favorites }
		})
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				register,
				login,
				logout,
				setIsLoading,
				setAuthState,
				setShowRegisterModal,
				setFavorites
			}
		}>
			{ children }
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState }