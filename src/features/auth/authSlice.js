import { createSlice } from "@reduxjs/toolkit"

const loadFromStorage = () => {
    try {
        return {
            token: localStorage.getItem('auth_token') || null,
            user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
        }
    } catch {
        return { token: null, user: null }
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: loadFromStorage(),
    reducers: {
        setCredentials: (state, action) => {
            const { payload, accessToken } = action.payload
            state.user = payload
            state.token = accessToken
            try {
                localStorage.setItem('auth_token', accessToken)
                localStorage.setItem('auth_user', JSON.stringify(payload))
            } catch {}
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            try {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_user')
            } catch {}
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token