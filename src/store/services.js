import { configureStore, createSlice } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

// Начальное состояние
const initialState = {
    services: [],
    isLoading: false,
    error: null,
};

// Создание слайса
const servicesSlice = createSlice({
    name: 'services',
    initialState,
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

// Экшены из слайса
export const { setServices, setLoading, setError } = servicesSlice.actions;

// Асинхронный запрос
export const fetchServices = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch('https://6749aea18680202966321fed.mockapi.io/service');
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        console.log('Полученные данные:', data); // Отладка
        dispatch(setServices(data));
    } catch (error) {
        console.error('Ошибка API:', error.message); // Отладка
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};


// Создание стора
const store = configureStore({
    reducer: {
        services: servicesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
