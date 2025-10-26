"use client"

import { createContext, useContext, useState, useCallback } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  // const login = useCallback(async (email, password) => {
  //   setLoading(true)
  //   try {
  //     const response = await fetch("/api/v1/users/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     })

  //     if (!response.ok) {
  //       const errorData = await response.json()
  //       throw new Error(errorData.message || "Login failed")
  //     }

  //     const data = await response.json()
  //     setUser(data.user)
  //     setIsAuthenticated(true)

  //     // Store token if provided
  //     if (data.token) {
  //       localStorage.setItem("authToken", data.token)
  //     }

  //     return data
  //   } catch (error) {
  //     console.error("Login error:", error)
  //     throw error
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      const data = await response.json()
      
      // Store user data and token
      setUser(data.data.user)
      setIsAuthenticated(true)
      
      // Store access token in localStorage
      if (data.data.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken)
      }

      return data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (formData) => {
    setLoading(true)
    try {
      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        body: formData, // FormData is sent as multipart/form-data
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const verifyOtp = useCallback(async (otp) => {
    setLoading(true)
    try {
      const response = await fetch("/api/v1/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "OTP verification failed")
      }

      const data = await response.json()
      setUser(data.user)
      setIsAuthenticated(true)

      // Store token if provided
      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }

      return data
    } catch (error) {
      console.error("OTP verification error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("authToken")
  }, [])

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    verifyOtp,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
