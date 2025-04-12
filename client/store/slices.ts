import { Fundraising, User } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
    alert: { message: string; type: 'success' | 'error' | 'info' | 'warning'; };
    notificationData: { title: string; message: string; time: string; }[];
    sideNavOpen: boolean;
    fundraisings: Fundraising[],
    userFundRaisings: Fundraising[],
    user: User
}

const initialState: InitialState = {
    alert: {
        message: '',
        type: 'success',
    },
    notificationData: [],
    sideNavOpen: false,
    fundraisings: [],
    userFundRaisings: [],
    user: {
        email: ''
    }
};

const slice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
            state.alert.message = action.payload.message;
            state.alert.type = action.payload.type;
        },
        setNotificationData: (state, action) => {
            state.notificationData = action.payload
        },
        setSideNavOpen: (state, action) => {
            state.sideNavOpen = action.payload
        },
        setFundraisings: (state, action) => {
            state.fundraisings = action.payload
        },
        setUserFundraisings: (state, action) => {
            state.userFundRaisings = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
});

export const { setAlert, setNotificationData, setSideNavOpen, setFundraisings, setUserFundraisings, setUser } = slice.actions;
export default slice.reducer;
