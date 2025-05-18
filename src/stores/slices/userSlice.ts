import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface UserState {
    isAuthenticated: boolean;
    user: IUser | undefined;
    mode: string;
}

const accessToken = Cookies.get('accessToken');
let user: IUser | undefined;
try {
    const userCookie = Cookies.get('user');
    user = userCookie ? (JSON.parse(userCookie) as IUser) : undefined;
} catch (error) {
    console.error('Failed to parse user cookie:', error);
    user = undefined;
}

const initialState: UserState = {
    isAuthenticated: !!accessToken,
    user: user || undefined,
    mode: localStorage.getItem('mode') ?? 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<IUser>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            state.user = undefined;
        },
        changeMode: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
                localStorage.setItem('mode', 'dark');
            } else {
                state.mode = 'light';
                localStorage.setItem('mode', 'light');
            }
        },
        updateSuccess(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
    },
});

export const { loginSuccess, logoutSuccess, updateSuccess } = userSlice.actions;
export default userSlice.reducer;