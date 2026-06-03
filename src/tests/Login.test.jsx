import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { ChakraProvider } from '@chakra-ui/react'
import Login from '../auth/Login'
import authReducer from '../features/auth/authSlice'

// ── Mock the RTK Query login mutation ──────────────────────────────────────
const mockLogin = vi.fn()

vi.mock('../features/auth/authApiSlice', () => ({
  useLoginMutation: () => [mockLogin, { isLoading: false }],
}))

// ── Helpers ────────────────────────────────────────────────────────────────
const buildStore = () =>
  configureStore({ reducer: { auth: authReducer } })

const renderLogin = () => {
  const store = buildStore()
  render(
    <Provider store={store}>
      <ChakraProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </ChakraProvider>
    </Provider>
  )
  return { store }
}

// ── Tests ──────────────────────────────────────────────────────────────────
describe('Login page', () => {

  beforeEach(() => {
    mockLogin.mockReset()
  })

  it('renders email, password inputs and Log In button', () => {
    renderLogin()
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('Log In button is disabled when form is empty', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled()
  })

  it('shows validation error for invalid email', async () => {
    renderLogin()
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    await userEvent.type(emailInput, 'notanemail')
    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument()
  })

  it('enables Log In button when email is valid', async () => {
    renderLogin()
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    await userEvent.type(emailInput, 'user@hotel.com')
    expect(screen.getByRole('button', { name: /log in/i })).not.toBeDisabled()
  })

  it('calls login mutation with correct credentials on submit', async () => {
    mockLogin.mockReturnValue({
      unwrap: () => Promise.resolve({ accessToken: 'token123', payload: { id: 1 } }),
    })
    renderLogin()

    await userEvent.type(screen.getByPlaceholderText(/enter your email/i), 'user@hotel.com')
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), 'secret123')
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'user@hotel.com',
        Password: 'secret123',
      })
    })
  })

  it('saves token to localStorage on successful login', async () => {
    mockLogin.mockReturnValue({
      unwrap: () => Promise.resolve({
        accessToken: 'jwt-token-abc',
        payload: { id: 1, email: 'user@hotel.com' },
      }),
    })
    renderLogin()

    await userEvent.type(screen.getByPlaceholderText(/enter your email/i), 'user@hotel.com')
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), 'secret123')
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(localStorage.getItem('auth_token')).toBe('jwt-token-abc')
    })
  })

  it('shows error message when login fails', async () => {
    mockLogin.mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: 'Invalid credentials' } }),
    })
    renderLogin()

    await userEvent.type(screen.getByPlaceholderText(/enter your email/i), 'wrong@hotel.com')
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), 'wrongpass')
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })

  it('has a link to signup page', () => {
    renderLogin()
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/signup')
  })

  it('has a forgot password link', () => {
    renderLogin()
    expect(screen.getByRole('link', { name: /forgot password/i })).toHaveAttribute('href', '/forgot_password')
  })
})
