import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, expiresInMins: 30 }),
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (!response.ok) {
                console.error("Ошибка API:", data.message || "Неверные данные для входа");
                throw new Error(data.message || "Неверные данные для входа");
            }

            if (!data.accessToken) {
                console.error("Токен отсутствует в ответе API");
                throw new Error("API не вернул accessToken");
            }

            return data;
        } catch (error) {
            console.error("API Error:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserData = createAsyncThunk(
    "auth/fetchUserData",
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.accessToken;
        if (!token) {
            console.error("Токен отсутствует в localStorage");
            return rejectWithValue("Токен отсутствует");
        }

        try {
            const response = await fetch("https://dummyjson.com/auth/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Ошибка API при получении данных пользователя:", data.message);
                throw new Error(data.message || "Ошибка получения данных пользователя");
            }

            return data;
        } catch (error) {
            console.error("API Error:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: localStorage.getItem("accessToken") || null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem("accessToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;

                const token = action.payload.accessToken;
                if (!token) {
                    console.error("Токен отсутствует после входа");
                    return;
                }

                state.accessToken = token;
                state.user = action.payloa

                localStorage.setItem("accessToken", token);
                console.log("Успешный вход!");
                console.log("Сохраненный токен:", token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.error("Ошибка при входе:", action.payload);
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.error = action.payload;
                console.error("Ошибка при получении данных пользователя:", action.payload);
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
