// React navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MonthDetailScreen from "../screens/MonthDetailScreen";
import TestScreen from "../screens/TestScreen";
import AuthScreen from "../screens/AuthScreen";

// Tools
import Tools from "../constants/Tools";

// Default styles
const defaultStackNavOptions = {
	headerStyle: {
		height: 0,
	},
	cardStyle: { 
		backgroundColor: Tools.colorBackground,
	}
};

// ***** Shop stack
const HomeNavigator = createStackNavigator({
	Home: {
		// screen: HomeScreen,
		// screen: TestScreen,
		screen: AuthScreen,
	}, 
	MonthDetail: {
		screen: MonthDetailScreen
	}
}, {
	defaultNavigationOptions: defaultStackNavOptions,
});

export default createAppContainer(HomeNavigator);
