import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_PROFILES,
	GET_ARTICLES,
	GET_DPS
} from '../actions/types';

const initialState = {
	profile              : null,
	profiles             : [],
	researchPublications : [],
	loading              : true,
	error                : {},
	articles             : [],
	dpPics               : []
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile : payload,
				loading : false
			};
		case GET_PROFILES:
			return {
				...state,
				profiles : payload,
				loading  : false
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile              : null,
				researchPublications : []
			};
		case PROFILE_ERROR:
			return {
				...state,
				error   : payload,
				loading : false,
				profile : null
			};
		case GET_ARTICLES:
			return {
				...state,
				articles : payload
			};
		case GET_DPS:
			return {
				...state,
				dpPics : payload
			};
		default:
			return state;
	}
}
