// React
import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	ActivityIndicator,
	Alert
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as Actions from "../store/actions/actions";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Components
import Input from "../components/Input";

// Constants 
import Tools from '../constants/Tools';
const arrowPath = "M 0 14.4 V 1.6 c 0 -1.2 1.3 -1.9 2.3 -1.4 l 10.9 6.3 c 1.1 0.6 1.1 2.3 0 2.9 L 2.3 15.8 C 1.3 16.4 0 15.6 0 14.4 Z";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


// ================================
// ====   LAST UPDATE:
// ====   WORJKED ON AUTH / LOGIN
// ====   NEXT UP: NAV FOR LOGIN 
// ====            LOGIN POLISH
// ====            DATA SETUP
// ====            
// ================================

const initialState = {
	inputValues: {
		email: "",
		password: "",
	},
	inputValidities: {
		email: false,
		password: false,
	},
	formIsValid: false,
};

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}

		return {
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid: updatedFormIsValid,
		};
	}
	return state;
};

// ==================== Component
const AuthScreen = props => {
	const dispatch = useDispatch();

	// State
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [formState, dispatchFormState] = useReducer(formReducer, initialState);
	const [isLogin, setIsLogin] = useState(true);

	// Keyboard open constant
	const currentData = useSelector(state => state.dataReducer.data);

	// Min keyboard
	const handleTouchableWithoutFeedback = () => {
		Keyboard.dismiss();
	}

	// Login -> reg
	const switchLogin = () => {
		setIsLogin(!isLogin);
	}

	// Handle login/reg
	const loginHandler = async () => {
		console.log("loginHandler");
		// If not valid, stop
		if (!formState.inputValidities.email) return;

		if (isLogin) {
			// Login logic
			console.log("login");
			setError(null);
			setIsLoading(true);
			try {
				await dispatch(Actions.login(formState.inputValues.email.trim(), formState.inputValues.password.trim()));

				// const currentData = useSelector(state => state.authReducer.userId);
				console.log("current data: ", currentData);

				props.navigation.navigate("Home");
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
			}
		} else {
			// Reg logic
			console.log("reg");
			setError(null);
			setIsLoading(true);
			try {
				// Fire signup action
				await dispatch(Actions.signup(formState.inputValues.email.trim(), formState.inputValues.password.trim()));
				
				// Get new signup state
				// const currentData = useSelector(state => state.authReducer.userId);
				console.log("current data: ", currentData);
				props.navigation.navigate("Home");
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		if (error) {
			Alert.alert("An error occurred!", error, [{ test: "Okay" }]);
		}
	}, [error]);

	// const test = () => {
	// 	console.log(formState.inputValues.password.length);
	// 	if (!formState.inputValidities.email || formState.inputValues.password.length < 8) return;

	// 	console.log(formState.inputValidities.email, formState.inputValidities.password, formState.formIsValid);
	// }

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[dispatchFormState]
	);


	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<KeyboardAvoidingView
				behavior="padding"
				keyboardVerticalOffset={useSelector(state => state.navReducer.headerHeightState)}
				style={{ flex: 1 }}>
				<View style={styles.screen}>

					<View style={{ width: "100%" }}>
						<Text style={styles.titleText}>FeelBetter</Text>
					</View>

					{/* EMAIL */}
					<Input
						id="email"
						label="Email"
						onInputChange={inputChangeHandler}

						email
						required
						minLength={5}
						autoCapitalize={"none"}
						errorText={"Please enter a valid email address."}

						style={styles.textInput}
						placeholder={"Email"}
						placeholderTextColor={"#fff"}
						selectionColor={Tools.colorLight}
						keyboardAppearance={"dark"}
						keyboardType={"email-address"}
						/>

					{/* PASSWORD */}
					<Input
						id="password"
						label="Password"
						onInputChange={inputChangeHandler}

						required
						minLength={8}
						autoCapitalize={"none"}
						errorText={"Please enter a valid password."}

						style={styles.textInput}
						placeholder={"Password"}
						placeholderTextColor={"#fff"}
						selectionColor={Tools.colorLight}
						keyboardAppearance={"dark"}
						keyboardType={"default"}
						/>

					<View style={styles.switchTextContainer}>
						<Text style={styles.switchText}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
						<TouchableOpacity onPress={switchLogin}>
							<Text style={{ ...styles.switchText, ...styles.switchTextButton }}>{isLogin ? "Register now." : "Login now."}</Text>
						</TouchableOpacity>
					</View>

					{isLoading ? <ActivityIndicator size="small" color={Tools.color1} /> : <TouchableOpacity style={{ ...styles.button, backgroundColor: isLogin ? Tools.color1 : Tools.color3 }} onPress={loginHandler}>
						<Text style={{ color: "#fff", fontSize: 18 }}>
							{isLogin ? "Login" : "Register"}
						</Text>

						<Svg style={{ marginLeft: 10 }}
							width={8}
							height={10}
							viewBox="0 0 14 16">
							<Path fill={Tools.colorLight} d={arrowPath} />
						</Svg>
					</TouchableOpacity>}

					{/* <TouchableOpacity style={{ ...styles.button, backgroundColor: isLogin ? Tools.color1 : Tools.color3 }} onPress={test}>
						<Text style={{ color: "#fff", fontSize: 18 }}>
							{isLogin ? "test" : "test"}
						</Text>

						<Svg style={{ marginLeft: 10 }}
							width={8}
							height={10}
							viewBox="0 0 14 16">
							<Path fill={Tools.colorLight} d={arrowPath} />
						</Svg>
					</TouchableOpacity> */}

				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: "column",
		alignItems: "flex-start",
		backgroundColor: Tools.colorBackground,
		padding: Tools.paddingDouble,
	},
	titleText: {
		width: "100%",
		fontSize: 40,
		fontWeight: "700",
		color: Tools.color5,

	},
	textInput: {
		marginTop: Tools.paddingNormal,

		minWidth: "100%",
		maxWidth: "100%",
		height: 46,
		backgroundColor: Tools.colorTextboxGrey,
		color: Tools.colorLight,
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 8,
		// lineHeight: 22,
		borderRadius: 3,
		fontSize: 18
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		// backgroundColor: Tools.color1,
		marginTop: Tools.paddingDouble,
		paddingVertical: Tools.paddingNormal,
		paddingHorizontal: Tools.paddingDouble,
		borderRadius: 3,
	},
	switchTextContainer: {
		// marginTop: Tools.paddingHalf,
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	switchText: {
		color: Tools.colorLight,
		fontSize: 12,
		paddingVertical: Tools.paddingHalf,
	},
	switchTextButton: {
		color: Tools.color3,
		paddingLeft: 4,
	},
});

export default AuthScreen;
