export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOADDATA = "LOADDATA";
export const CREATE_NEW_ACCOUNT_DATA = "CREATE_NEW_ACCOUNT_DATA";

export const TEST_DATA = "TEST_DATA";

// Keyboard open bool
export const setKeyboardOpen = (openBool) => {
	return {
		type: SET_KEYBOARD_OPEN,
		openBool: openBool
	};
};

// Header height int
export const setHeaderHeight = (heightInt) => {
	return {
		type: SET_HEADER_HEIGHT,
		heightInt: heightInt
	};
};

// Sign up
export const signup = (email, password) => {
	return async dispatch => {
		// any async code before dispatching
		const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSmR6DzYUNSsWlaaeyqyMTP2etMA01sOU", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true,
			})
		});

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong. Please try again.";
			switch (errorId) {
				case "EMAIL_EXISTS": 
					message = "This email already has an account.";
					break;
				// case "INVALID_PASSWORD":
				// 	message = "Invalid password.";
				// 	break;
				default: break;
			}
			throw new Error(message);
		};

		const resData = await response.json();

		console.log(resData);

		dispatch({ 
			type: SIGNUP,
			token: resData.idToken,
			userId: resData.loaclId,
		});
	};
};

// Login
export const login = (email, password) => {
	return async dispatch => {
		// any async code before dispatching
		const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSmR6DzYUNSsWlaaeyqyMTP2etMA01sOU", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true,
			})
		});

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong. Please try again.";
			switch (errorId) {
				case "EMAIL_NOT_FOUND": 
					message = "This email cannot be found.";
					break;
				case "INVALID_PASSWORD":
					message = "Invalid password.";
					break;
				default: break;
			}
			throw new Error(message);
		};

		const resData = await response.json();

		console.log(resData);

		dispatch({ 
			type: LOGIN,
			token: resData.idToken,
			userId: resData.localId,
		});
	};
};

// Loading data (fetched from firebase)
export const loadData = (uid, year) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`);

		const resData = await response.json(); 

		dispatch({
			type: LOADDATA,
			data: resData
		});
	};
};





// test data
export const testData = (uid, data, year) => {
	return async dispatch => {
		// any async code before dispatching
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				data
			})
		});

		if (!response.ok) {
			let message = "Something went wrong. Please try again.";
			// const errorResData = await response.json();
			// const errorId = errorResData.error.message;
			// switch (errorId) {
			// 	case "EMAIL_NOT_FOUND": 
			// 		message = "This email cannot be found.";
			// 		break;
			// 	case "INVALID_PASSWORD":
			// 		message = "Invalid password.";
			// 		break;
			// 	default: break;
			// }
			throw new Error(message);
		};

		const resData = await response.json();

		// console.log(resData);

		dispatch({ 
			type: TEST_DATA,
		});
	};
};


// import { useDispatch } from "react-redux";
//import * as Actions from "../store/actions/actions";
// const dispatch = useDispatch();
// dispatch(setKeyboardOpen(true));
