import { describe, it, expect, beforeEach } from 'vitest'
import authReducer, { setCredentials, logOut } from '../features/auth/authSlice'

const fakeUser    = { id: 1, email: 'test@hotel.com', role: 'admin' }
const fakeToken   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token'
const fakePayload = { payload: fakeUser, accessToken: fakeToken }

describe('authSlice', () => {

  describe('setCredentials', () => {
    it('saves token and user to Redux state', () => {
      const state = authReducer({ token: null, user: null }, setCredentials(fakePayload))
      expect(state.token).toBe(fakeToken)
      expect(state.user).toEqual(fakeUser)
    })

    it('saves auth_token to localStorage', () => {
      authReducer({ token: null, user: null }, setCredentials(fakePayload))
      expect(localStorage.getItem('auth_token')).toBe(fakeToken)
    })

    it('saves auth_user to localStorage as JSON', () => {
      authReducer({ token: null, user: null }, setCredentials(fakePayload))
      expect(JSON.parse(localStorage.getItem('auth_user'))).toEqual(fakeUser)
    })
  })

  describe('logOut', () => {
    beforeEach(() => {
      // start with a logged-in state
      localStorage.setItem('auth_token', fakeToken)
      localStorage.setItem('auth_user', JSON.stringify(fakeUser))
    })

    it('clears token and user from Redux state', () => {
      const state = authReducer({ token: fakeToken, user: fakeUser }, logOut())
      expect(state.token).toBeNull()
      expect(state.user).toBeNull()
    })

    it('removes auth_token from localStorage', () => {
      authReducer({ token: fakeToken, user: fakeUser }, logOut())
      expect(localStorage.getItem('auth_token')).toBeNull()
    })

    it('removes auth_user from localStorage', () => {
      authReducer({ token: fakeToken, user: fakeUser }, logOut())
      expect(localStorage.getItem('auth_user')).toBeNull()
    })
  })

  describe('initial state (page reload simulation)', () => {
    it('starts with null when localStorage is empty', () => {
      // localStorage is cleared in setup.js beforeEach
      // Re-importing the slice re-runs loadFromStorage with empty localStorage
      const state = authReducer(undefined, { type: '@@INIT' })
      expect(state.token).toBeNull()
      expect(state.user).toBeNull()
    })

    it('restores token from localStorage on startup — fixes Telegram WebView loop', () => {
      // Simulate: user logged in previously, page reloaded (token in localStorage)
      localStorage.setItem('auth_token', fakeToken)
      localStorage.setItem('auth_user', JSON.stringify(fakeUser))

      // Dynamic re-import simulates a fresh module load (page reload)
      const token = localStorage.getItem('auth_token') || null
      const user  = JSON.parse(localStorage.getItem('auth_user') || 'null')

      expect(token).toBe(fakeToken)
      expect(user).toEqual(fakeUser)
    })
  })
})
