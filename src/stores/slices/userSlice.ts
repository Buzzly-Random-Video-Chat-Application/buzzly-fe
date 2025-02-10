import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';
import Cookies from 'js-cookie';

interface UserState {
    isAuthenticated: boolean;
    user: IUser | null;
    mode: string | null;
}

const accessToken = Cookies.get('accessToken');
const user: IUser | null = Cookies.get('user') ? (JSON.parse(Cookies.get('user') as string) as IUser) : null;

const initialState: UserState = {
    isAuthenticated: !!accessToken,
    user: user || null,
    mode: localStorage.getItem('mode')
        ? localStorage.getItem('mode')
        : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
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
            state.user = null;
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
        }
    },
});

export const { loginSuccess, logoutSuccess, updateSuccess } = userSlice.actions;
export default userSlice.reducer;