import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import verifyToken from '../middleware/verifiToken'
import { logOut } from '../features/auth/authSlice'

vi.mock('axios')

const fakeToken    = 'valid.jwt.token'
const mockDispatch = vi.fn()
const mockRefresh  = vi.fn()

describe('verifyToken middleware', () => {

  beforeEach(() => {
    mockDispatch.mockReset()
    mockRefresh.mockReset()
  })

  it('returns false immediately when no token is provided', async () => {
    const result = await verifyToken(null, mockDispatch, mockRefresh)
    expect(result).toBe(false)
    expect(axios.post).not.toHaveBeenCalled()
  })

  it('returns false when token is undefined', async () => {
    const result = await verifyToken(undefined, mockDispatch, mockRefresh)
    expect(result).toBe(false)
  })

  it('returns true when backend verifies the token successfully', async () => {
    axios.post.mockResolvedValue({ data: { verified: true } })
    const result = await verifyToken(fakeToken, mockDispatch, mockRefresh)
    expect(result).toBe(true)
  })

  it('calls refresh() when backend returns 403 (expired token)', async () => {
    axios.post.mockRejectedValue({
      response: { data: { statusCode: 403 } },
    })
    await verifyToken(fakeToken, mockDispatch, mockRefresh)
    expect(mockRefresh).toHaveBeenCalledOnce()
    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('dispatches logOut when backend returns non-403 error (invalid token)', async () => {
    axios.post.mockRejectedValue({
      response: { data: { statusCode: 401 } },
    })

    try {
      await verifyToken(fakeToken, mockDispatch, mockRefresh)
    } catch {
      // expected to throw
    }

    expect(mockDispatch).toHaveBeenCalledWith(logOut())
    expect(mockRefresh).not.toHaveBeenCalled()
  })

  it('sends the token as Authorization Bearer header', async () => {
    axios.post.mockResolvedValue({ data: { verified: true } })
    await verifyToken(fakeToken, mockDispatch, mockRefresh)

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/auth/verify-token'),
      {},
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: `Bearer ${fakeToken}`,
        }),
      })
    )
  })
})
