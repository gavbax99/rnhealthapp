// React
import React, { useEffect } from 'react';
import { 
	StyleSheet, 
	View,
	ActivityIndicator
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import HomeScreenMonth from '../components/HomeScreenMonth';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { loadData } from "../store/actions/actions";

// ==================== Component
const HomeScreenCalendar = props => {

	const dispatch = useDispatch();

	console.log("HomeScreenCalendar render");

	const date = new Date();
	const getYear = date.getFullYear();
	const getMonth = date.getMonth();
	const getDay = date.getDate();

	const data = useSelector(state => state.dataReducer.data);
	const uid = useSelector(state => state.authReducer.userId);
	// const token = useSelector(state => state.authReducer.token); <- USE THIS INSTEAD OF UID?
	useEffect(() => {
		dispatch(loadData(uid, getYear));		
	}, [uid]);

	// console.log("current homescreen data: ", data);

	const Loading = () => {
		return (
			<View style={styles.loadingIconContainer}>
				<ActivityIndicator size="large" color={Tools.colorLight} />
			</View>
		);
	};

	return (
		<View style={styles.calendar}>

			{/* List of months */}
			<View style={styles.calendarInner}>

				{/* Render our months */}
				{Object.keys(data).length !== 0 ? 
					data.months.map((monthObj, i) => {
						return (
							<HomeScreenMonth 
								year={data.yearInt}
								monthObj={monthObj}
								navigation={props.navigation}
								key={monthObj.name} 
								/>
						);
					}) 
				: <Loading/>}

			</View>

		</View>
	);
};

// ==================== Styles
const styles = StyleSheet.create({
	calendar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	calendarInner: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
		padding: Tools.paddingHalf,
	},
	loadingIconContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default HomeScreenCalendar;