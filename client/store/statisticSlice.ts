import { Fundraising } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialStatisticState {
    activeFundraising: Fundraising;
    generalIncome: number;
    dailyIncome: number;
    totalIncome: number;
}

const initialState: InitialStatisticState = {
    activeFundraising: { email: "", title: "", story: "", thumbnail: "", amount: 0, amountDonated: 0, fundraisingFor: "", category: "", id: "", location: "", role: "" },
    generalIncome: 0,
    dailyIncome: 0,
    totalIncome: 0,
};

const slice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        setActiveFundraising: (state, action) => {
            state.activeFundraising = action.payload;
            let amount = 0;
            state.activeFundraising.donors?.forEach(don => amount += don.amount ?? 0);
            console.log(amount)
        },
        setGeneralIncome: (state, action) => {
            state.generalIncome = action.payload
        },
        setDailyIncome: (state, action) => {
            state.dailyIncome = action.payload
        },
        setTotalIncome: (state, action) => {
            state.totalIncome = action.payload
        },
    },
});

export const { setActiveFundraising, setDailyIncome, setGeneralIncome, setTotalIncome } = slice.actions;
export default slice.reducer;
