import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialServicesState = {
    services: [],
    isLoading: false,
    error: null,
};


const servicesSlice = createSlice({
    name: 'services',
    initialState: initialServicesState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});


export const { setServices, setLoading, setError } = servicesSlice.actions;

export const fetchServices = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch('https://6749aea18680202966321fed.mockapi.io/service');
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        dispatch(setServices(data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};


const initialAuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload; // Если пользователь есть, то true
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});


export const { setUser, setLoading: setAuthLoading, setError: setAuthError } = authSlice.actions;


export const registerUser = (userData) => async (dispatch) => {
    dispatch(setAuthLoading(true));
    try {
        const response = await fetch('https://ваш-api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error(`Ошибка регистрации: ${response.status}`);
        const data = await response.json();
        dispatch(setUser(data));
    } catch (error) {
        dispatch(setAuthError(error.message));
    } finally {
        dispatch(setAuthLoading(false));
    }
};


export const loginUser = (credentials) => async (dispatch) => {
    dispatch(setAuthLoading(true));
    try {
        const response = await fetch('https://ваш-api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) throw new Error(`Ошибка входа: ${response.status}`);
        const data = await response.json();
        dispatch(setUser(data));
    } catch (error) {
        dispatch(setAuthError(error.message));
    } finally {
        dispatch(setAuthLoading(false));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(setUser(null));
};

const store = configureStore({
    reducer: {
        services: servicesSlice.reducer,
        auth: authSlice.reducer,
    },
});

export default store;
