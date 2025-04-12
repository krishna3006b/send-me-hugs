import { createSlice } from "@reduxjs/toolkit"

interface WalletSlice {
    walletAddress: string;
}

const initialState: WalletSlice = {
    walletAddress: ""
}

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload
        }
    }
})

export const { setWalletAddress } = walletSlice.actions

export default walletSlice.reducer