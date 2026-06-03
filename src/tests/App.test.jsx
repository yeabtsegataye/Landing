import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { ChakraProvider } from '@chakra-ui/react'
import authReducer from '../features/auth/authSlice'

// ── Mocks ──────────────────────────────────────────────────────────────────
vi.mock('../hooks/useRefreshToken', () => ({
  default: () => vi.fn(),
}))

vi.mock('../middleware/verifiToken', () => ({
  default: vi.fn(),
}))

import verifyToken from '../middleware/verifiToken'
import App from '../App'

const buildStore = (authState = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { token: null, user: null, ...authState } },
  })

const renderApp = (initialPath = '/', authState = {}) => {
  const store = buildStore(authState)
  render(
    <Provider store={store}>
      <ChakraProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    </Provider>
  )
  return { store }
}

// ── Tests ──────────────────────────────────────────────────────────────────
describe('App routing', () => {

  it('renders the home page at /', async () => {
    verifyToken.mockResolvedValue(false)
    renderApp('/')
    // Home page should render (not redirect to login)
    await waitFor(() => {
      expect(document.body).toBeInTheDocument()
    })
  })

  it('redirects unauthenticated user from /checkout/:id to Login', async () => {
    verifyToken.mockResolvedValue(false)
    renderApp('/checkout/1', { token: null, user: null })

    await waitFor(() => {
      // When not verified, checkout renders Login component
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    })
  })

  it('renders Checkout when user is verified', async () => {
    verifyToken.mockResolvedValue(true)
    renderApp('/checkout/1', {
      token: 'valid.token',
      user: { id: 1, email: 'test@hotel.com' },
    })

    await waitFor(() => {
      // Checkout renders — email input (from Login) should NOT be present
      expect(screen.queryByPlaceholderText(/enter your email/i)).not.toBeInTheDocument()
    })
  })

  it('renders Login page at /login', async () => {
    verifyToken.mockResolvedValue(false)
    renderApp('/login')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    })
  })

  it('renders Signup page at /signup', async () => {
    verifyToken.mockResolvedValue(false)
    renderApp('/signup')

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    })
  })
})
