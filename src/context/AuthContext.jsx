
import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

import {
  loginUserApi,
  registerUserApi,
  fetchUserProfileApi,
} from '../services/auth'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore the saved session when the app starts.
  useEffect(() => {
    let active = true

    const checkAuth = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        if (active) setLoading(false)
        return
      }

      try {
        const data = await fetchUserProfileApi()

        if (active) {
          setUser(data.user)
        }
      } catch (error) {
        console.error('Unable to restore login session:', error)

        // Remove only an invalid/expired session.
        if (error.status === 401) {
          localStorage.removeItem('token')
        }

        if (active) {
          setUser(null)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    checkAuth()

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async credentials => {
    const data = await loginUserApi(credentials)

    if (!data.token || !data.user) {
      throw new Error('Login response is missing user or token data.')
    }

    localStorage.setItem('token', data.token)
    setUser(data.user)

    return data
  }, [])

  const register = useCallback(async userData => {
    const data = await registerUserApi(userData)

    // Keep the existing behavior: registration logs the user in
    // if the backend returns a token and user.
    if (data.token && data.user) {
      localStorage.setItem('token', data.token)
      setUser(data.user)
    }

    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)

    // Do not clear the cart here. The user's saved cart
    // should remain available when they log in again.
  }, [])

  const updateUser = useCallback(updatedUser => {
    setUser(previous =>
      previous ? { ...previous, ...updatedUser } : previous,
    )
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
