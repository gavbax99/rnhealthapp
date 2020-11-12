import { 
	LOAD_DATA,
	UPDATEDATA,
 } from "../actions/actions";

const initialState = {
	data: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DATA:
			return { 
				...state, 
				data: action.data 
			};

		case UPDATEDATA:
			return { 
				...state, 
				data: action.data 
			};
	};
	return state;
};

// import { useSelector } from "react-redux";
// const headerHeightState = useSelector(state => state.navReducer.headerHeightState);