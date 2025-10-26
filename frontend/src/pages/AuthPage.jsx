"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, User } from "lucide-react"
import "./AuthPage.css"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    coverImage: null,
  })
  const [otp, setOtp] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: e.target.files[0],
    }))
  }

  const handleToggle = () => {
    setIsLogin(!isLogin)
    setError("")
    setMessage("")
    setShowOtpForm(false)
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      coverImage: null,
    })
    setOtp("")
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      setMessage("Login successful! Redirecting...")
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (!formData.username || !formData.email || !formData.password) {
      setError("Username, email, and password are required")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("userName", formData.username)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage)
      }

      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      setMessage("OTP sent to your email!")
      setShowOtpForm(true)
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (!otp) {
      setError("OTP is required")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed")
      }

      setMessage("Registration successful! Redirecting to login...")
      setTimeout(() => {
        setShowOtpForm(false)
        setIsLogin(true)
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
          coverImage: null,
        })
        setOtp("")
      }, 1500)
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      {/* Blurry shadow background */}
      <div className="auth-blur-shadow"></div>

      {/* Main container with border */}
      <div className="auth-main">
        {/* Animated sliding container */}
        <div className="auth-slider">
          {/* Login Form Side */}
          <div
            className="auth-form-side auth-login-side"
            style={{
              transform: isLogin && !showOtpForm ? "translateX(0)" : "translateX(-100%)",
              opacity: isLogin && !showOtpForm ? 1 : 0,
              pointerEvents: isLogin && !showOtpForm ? "auto" : "none",
            }}
          >
            <div className="auth-form-wrapper">
              <h1 className="auth-title">Login</h1>

              <form onSubmit={handleLoginSubmit} className="auth-form">
                {/* Email Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Email</label>
                  <div className="auth-input-wrapper">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Enter your email"
                    />
                    <Mail className="auth-icon" size={20} />
                  </div>
                </div>

                {/* Password Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Enter your password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-icon-btn">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && <p className="auth-error">{error}</p>}
                {message && <p className="auth-success">{message}</p>}

                {/* Login Button */}
                <button type="submit" disabled={loading} className="auth-button">
                  {loading ? "Signing In..." : "Login"}
                </button>
              </form>

              {/* Sign Up Link */}
              <p className="auth-toggle-text">
                Don't have an account?{" "}
                <button type="button" onClick={handleToggle} className="auth-toggle-link">
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Register Form Side */}
          <div
            className="auth-form-side auth-register-side"
            style={{
              transform: !isLogin && !showOtpForm ? "translateX(0)" : "translateX(100%)",
              opacity: !isLogin && !showOtpForm ? 1 : 0,
              pointerEvents: !isLogin && !showOtpForm ? "auto" : "none",
            }}
          >
            <div className="auth-form-wrapper">
              <h1 className="auth-title">Register</h1>

              <form onSubmit={handleRegisterSubmit} className="auth-form">
                {/* Username Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Username</label>
                  <div className="auth-input-wrapper">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Enter your username"
                    />
                    <User className="auth-icon" size={20} />
                  </div>
                </div>

                {/* Email Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Email</label>
                  <div className="auth-input-wrapper">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Enter your email"
                    />
                    <Mail className="auth-icon" size={20} />
                  </div>
                </div>

                {/* Password Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Enter your password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-icon-btn">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Confirm Password</label>
                  <div className="auth-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="auth-icon-btn"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Cover Image Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Cover Image (Optional)</label>
                  <input
                    type="file"
                    name="coverImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="auth-file-input"
                  />
                </div>

                {/* Error Message */}
                {error && <p className="auth-error">{error}</p>}
                {message && <p className="auth-success">{message}</p>}

                {/* Register Button */}
                <button type="submit" disabled={loading} className="auth-button">
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
       <div className="temp">
              <p className="auth-toggle-text">
                Already have an account?{" "}
                <button type="button" onClick={handleToggle} className="auth-toggle-link">
                  Login
                </button>
              </p>
              </div>
            </div>
          </div>

          {/* OTP Verification Form */}
          <div
            className="auth-form-side auth-otp-side"
            style={{
              transform: showOtpForm ? "translateX(0)" : "translateX(100%)",
              opacity: showOtpForm ? 1 : 0,
              pointerEvents: showOtpForm ? "auto" : "none",
            }}
          >
            <div className="auth-form-wrapper">
              <h1 className="auth-title">Verify Email</h1>

              <form onSubmit={handleOtpSubmit} className="auth-form">
                <p className="auth-otp-text">An OTP has been sent to your email address.</p>

                {/* OTP Input */}
                <div className="auth-input-group">
                  <label className="auth-label">Enter OTP</label>
                  <div className="auth-input-wrapper">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="auth-input auth-otp-input"
                      placeholder="000000"
                      maxLength="6"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && <p className="auth-error">{error}</p>}
                {message && <p className="auth-success">{message}</p>}

                {/* Verify Button */}
                <button type="submit" disabled={loading} className="auth-button">
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </div>
          </div>

          {/* Slanted Animated Panel */}
          <div
            className="auth-panel"
            style={{
              clipPath: isLogin
                ? "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)"
                : "polygon(0% 0%, 70% 0%, 100% 100%, 0% 100%)",
              right: isLogin ? "0" : "auto",
              left: isLogin ? "auto" : "0",
            }}
          >
            {/* Welcome/Join Message */}
            <div className="auth-panel-content">
              <h2 className="auth-panel-title">{isLogin ? "WELCOME BACK!" : "JOIN US!"}</h2>
              <p className="auth-panel-text">
                {isLogin
                  ? "Login now and enjoy finding your new travel destination"
                  : "Create your account and start your journey with us today"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
