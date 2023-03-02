import { createSlice } from '@reduxjs/toolkit';

export interface LeadsState {
	id: string;
	attributes: {
		Name: string;
		email: string;
		date: string;
		Status: '' | 'New' | 'Enrolled' | 'Interested' | 'Follow_up' | 'Negative';
		updatedAt: string;
		Source: '' | 'website' | 'word_of_mouth' | 'my_app' | 'google';
		createdAt: string;
		Notes: string;
		__typename: string;
	};
	__typename: string;
}

const initialState: {
	data: LeadsState[];
	loading: boolean;
} = {
	data: [],
	loading: false,
};

const leadsSlice = createSlice({
	name: 'leads',
	initialState,
	reducers: {
		loadLeads(state, action) {
			if (state.loading === false) {
				return {
					...state,
					loading: true,
					data: [...action.payload],
				};
			} else {
				return state;
			}
		},
		leadAdded(state, action) {
			const { lead } = action.payload;
			return {
				...state,
				data: [...state.data, lead],
			};
		},
		leadUpdated(state, action) {
			const { updates } = action.payload;
			return {
				...state,
				data: state.data.map((lead) => {
					if (lead.id === updates.id) {
						return {
							...lead,
							attributes: {
								...lead.attributes,
								...updates.attributes,
							},
						};
					} else {
						return lead;
					}
				}),
			};
		},
		leadDeleted(state, action) {
			const { id } = action.payload;
			const existingUser = state.data.find((lead) => lead.id === id);

			if (existingUser) {
				return { ...state, data: state.data.filter((lead) => lead.id !== id) };
			}
			return state;
		},
	},
});
export const { loadLeads, leadAdded, leadUpdated, leadDeleted } =
	leadsSlice.actions;

export default leadsSlice.reducer;
