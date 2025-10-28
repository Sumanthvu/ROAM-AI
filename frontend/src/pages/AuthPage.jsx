import { useState } from "react"
import { Eye, EyeOff, Mail, User, ArrowLeft } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./AuthPage.css"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    coverImage: null,
  })
  const [otp, setOtp] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: ""
  })

  // Auth context and navigation
  const auth = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, coverImage: e.target.files[0] }))
  }

  const handleToggle = () => {
    setIsLogin(!isLogin)
    setError("")
    setMessage("")
    setShowOtpForm(false)
    setShowForgotPassword(false)
    setShowResetPassword(false)
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      coverImage: null,
    })
    setOtp("")
  }

  // LOGIN SUBMIT
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
      const res = await auth.login(formData.email, formData.password)
      if (res && res.success) {
        setMessage("Login successful! Redirecting...")
        setTimeout(() => {
          navigate('/')
        }, 900)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  // REGISTER - SEND OTP
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (!formData.userName || !formData.email || !formData.password) {
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
      formDataToSend.append("userName", formData.userName)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage)
      }

      const res = await auth.register(formDataToSend)
      if (res && res.success) {
        setMessage(res.message || "OTP sent to your email!")
        setShowOtpForm(true)
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // VERIFY OTP AND REGISTER
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
      const res = await auth.verifyOtp(otp)
      if (res && res.success) {
        setMessage(res.message || "Registration successful! Redirecting to login...")
        setTimeout(() => {
          setShowOtpForm(false)
          setIsLogin(true)
          setFormData({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            coverImage: null,
          })
          setOtp("")
          setError("")
          setMessage("")
        }, 1500)
      }
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // FORGOT PASSWORD - SEND OTP
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (!resetEmail) {
      setError("Email is required")
      setLoading(false)
      return
    }

    try {
      const res = await auth.forgotPassword(resetEmail)
      if (res && res.success) {
        setMessage(res.message || "OTP sent to your email!")
        setResetData({ ...resetData, email: resetEmail })
        setShowForgotPassword(false)
        setShowResetPassword(true)
      }
    } catch (err) {
      setError(err.message || "Failed to send reset OTP.")
    } finally {
      setLoading(false)
    }
  }

  // RESET PASSWORD
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (!resetData.otp || !resetData.newPassword) {
      setError("OTP and new password are required")
      setLoading(false)
      return
    }

    try {
      const res = await auth.resetPassword(resetData.email, resetData.otp, resetData.newPassword)
      if (res && res.success) {
        setMessage(res.message || "Password reset successful! Please login.")
        setTimeout(() => {
          setShowResetPassword(false)
          setIsLogin(true)
          setResetData({ email: "", otp: "", newPassword: "" })
          setResetEmail("")
          setError("")
          setMessage("")
        }, 1500)
      }
    } catch (err) {
      setError(err.message || "Password reset failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'relative',
      width: '90%',
      maxWidth: '1100px',
      height: '600px',
      margin: '50px auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Blur shadow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '24px',
        filter: 'blur(48px)',
        backgroundColor: 'rgba(0, 212, 255, 0.35)',
        zIndex: -10
      }} />

      {/* Main container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        border: '2px solid rgb(0, 212, 255)',
        overflow: 'hidden',
        backgroundColor: 'rgb(10, 22, 40)',
        backdropFilter: 'blur(8px)'
      }}>
        
        {/* Sliding container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex'
        }}>
          
          {/* LOGIN FORM */}
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            transform: isLogin && !showOtpForm && !showForgotPassword && !showResetPassword ? 'translateX(0)' : 'translateX(-100%)',
            opacity: isLogin && !showOtpForm && !showForgotPassword && !showResetPassword ? 1 : 0,
            pointerEvents: isLogin && !showOtpForm && !showForgotPassword && !showResetPassword ? 'auto' : 'none',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ width: '85%', maxWidth: '400px' }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>Login</h1>

              <form onSubmit={handleLoginSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{
                    color: 'rgb(209, 213, 219)',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>Email</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(122, 211, 229, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <Mail size={20} color="rgb(0, 212, 255)" />
                  </div>
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{
                    color: 'rgb(209, 213, 219)',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>Password</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgb(0, 212, 255)',
                        cursor: 'pointer',
                        display: 'flex',
                        padding: 0
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true)
                      setError("")
                      setMessage("")
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgb(0, 212, 255)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {error && <p style={{ color: 'rgb(248, 113, 113)', fontSize: '0.875rem' }}>{error}</p>}
                {message && <p style={{ color: 'rgb(134, 239, 172)', fontSize: '0.875rem' }}>{message}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgb(0, 212, 255)',
                    color: 'rgb(15, 23, 42)',
                    fontWeight: '700',
                    padding: '0.75rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    marginTop: '0.5rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? "Signing In..." : "Login"}
                </button>
              </form>

              <p style={{
                textAlign: 'center',
                color: 'rgb(156, 163, 175)',
                marginTop: '1.5rem',
                fontSize: '0.85rem'
              }}>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={handleToggle}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgb(0, 212, 255)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* REGISTER FORM */}
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: '2rem',
            // overflowY: 'auto',
            transform: !isLogin && !showOtpForm ? 'translateX(0)' : 'translateX(100%)',
            opacity: !isLogin && !showOtpForm ? 1 : 0,
            pointerEvents: !isLogin && !showOtpForm ? 'auto' : 'none',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ width: '85%', maxWidth: '400px', paddingBottom: '2rem' }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>Register</h1>

              <form onSubmit={handleRegisterSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {/* Username */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>Username</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <User size={20} color="rgb(0, 212, 255)" />
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>Email</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <Mail size={20} color="rgb(0, 212, 255)" />
                  </div>
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>Password</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgb(0, 212, 255)',
                        cursor: 'pointer',
                        display: 'flex',
                        padding: 0
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>Confirm Password</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgb(0, 212, 255)',
                        cursor: 'pointer',
                        display: 'flex',
                        padding: 0
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Cover Image */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>
                    Cover Image (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{
                      color: 'rgb(209, 213, 219)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                {error && <p style={{ color: 'rgb(248, 113, 113)', fontSize: '0.875rem' }}>{error}</p>}
                {message && <p style={{ color: 'rgb(134, 239, 172)', fontSize: '0.875rem' }}>{message}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgb(0, 212, 255)',
                    color: 'rgb(15, 23, 42)',
                    fontWeight: '700',
                    padding: '0.75rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    marginTop: '0.5rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              <p style={{
                textAlign: 'center',
                color: 'rgb(156, 163, 175)',
                marginTop: '1.5rem',
                fontSize: '0.85rem'
              }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={handleToggle}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgb(0, 212, 255)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </div>

          {/* OTP VERIFICATION FORM */}
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            transform: showOtpForm ? 'translateX(0)' : 'translateX(100%)',
            opacity: showOtpForm ? 1 : 0,
            pointerEvents: showOtpForm ? 'auto' : 'none',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ width: '85%', maxWidth: '400px' }}>
              <button
                onClick={() => setShowOtpForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgb(0, 212, 255)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}
              >
                <ArrowLeft size={20} /> Back
              </button>

              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>Verify Email</h1>

              <form onSubmit={handleOtpSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <p style={{
                  color: 'rgb(209, 213, 219)',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  An OTP has been sent to your email address.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>Enter OTP</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem'
                  }}>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="000000"
                      maxLength="6"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '1.5rem',
                        padding: '0.375rem 0',
                        border: 'none',
                        textAlign: 'center',
                        letterSpacing: '0.2em',
                        fontWeight: '600'
                      }}
                    />
                  </div>
                </div>

                {error && <p style={{ color: 'rgb(248, 113, 113)', fontSize: '0.875rem' }}>{error}</p>}
                {message && <p style={{ color: 'rgb(134, 239, 172)', fontSize: '0.875rem' }}>{message}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgb(0, 212, 255)',
                    color: 'rgb(15, 23, 42)',
                    fontWeight: '700',
                    padding: '0.75rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </div>
          </div>

          {/* FORGOT PASSWORD FORM */}
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            transform: showForgotPassword ? 'translateX(0)' : 'translateX(-100%)',
            opacity: showForgotPassword ? 1 : 0,
            pointerEvents: showForgotPassword ? 'auto' : 'none',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ width: '85%', maxWidth: '400px' }}>
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setError("")
                  setMessage("")
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgb(0, 212, 255)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}
              >
                <ArrowLeft size={20} /> Back to Login
              </button>

              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>Forgot Password</h1>

              <form onSubmit={handleForgotPasswordSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <p style={{
                  color: 'rgb(209, 213, 219)',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>Email</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <Mail size={20} color="rgb(0, 212, 255)" />
                  </div>
                </div>

                {error && <p style={{ color: 'rgb(248, 113, 113)', fontSize: '0.875rem' }}>{error}</p>}
                {message && <p style={{ color: 'rgb(134, 239, 172)', fontSize: '0.875rem' }}>{message}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgb(0, 212, 255)',
                    color: 'rgb(15, 23, 42)',
                    fontWeight: '700',
                    padding: '0.75rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </div>
          </div>

          {/* RESET PASSWORD FORM */}
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            transform: showResetPassword ? 'translateX(0)' : 'translateX(-100%)',
            opacity: showResetPassword ? 1 : 0,
            pointerEvents: showResetPassword ? 'auto' : 'none',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ width: '85%', maxWidth: '400px' }}>
              <button
                onClick={() => {
                  setShowResetPassword(false)
                  setShowForgotPassword(true)
                  setError("")
                  setMessage("")
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgb(0, 212, 255)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}
              >
                <ArrowLeft size={20} /> Back
              </button>

              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>Reset Password</h1>

              <form onSubmit={handleResetPasswordSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <p style={{
                  color: 'rgb(209, 213, 219)',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  Enter the OTP sent to your email and your new password.
                </p>

                {/* OTP Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>Enter OTP</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem'
                  }}>
                    <input
                      type="text"
                      value={resetData.otp}
                      onChange={(e) => setResetData({ ...resetData, otp: e.target.value })}
                      placeholder="000000"
                      maxLength="6"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '1.2rem',
                        padding: '0.375rem 0',
                        border: 'none',
                        textAlign: 'center',
                        letterSpacing: '0.2em',
                        fontWeight: '600'
                      }}
                    />
                  </div>
                </div>

                {/* New Password Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgb(209, 213, 219)', fontSize: '0.9rem', fontWeight: '600' }}>New Password</label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
                    paddingBottom: '0.625rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={resetData.newPassword}
                      onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.95rem',
                        padding: '0.375rem 0',
                        border: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgb(0, 212, 255)',
                        cursor: 'pointer',
                        display: 'flex',
                        padding: 0
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && <p style={{ color: 'rgb(248, 113, 113)', fontSize: '0.875rem' }}>{error}</p>}
                {message && <p style={{ color: 'rgb(134, 239, 172)', fontSize: '0.875rem' }}>{message}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgb(0, 212, 255)',
                    color: 'rgb(15, 23, 42)',
                    fontWeight: '700',
                    padding: '0.75rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>

          {/* ANIMATED PANEL */}
          <div style={{
            position: 'absolute',
            top: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(135deg, rgb(76, 131, 142), rgb(6, 182, 212))',
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.1)',
            clipPath: isLogin || showForgotPassword || showResetPassword
              ? 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)'
              : 'polygon(0% 0%, 70% 0%, 100% 100%, 0% 100%)',
            right: isLogin || showForgotPassword || showResetPassword ? '0' : 'auto',
            left: isLogin || showForgotPassword || showResetPassword ? 'auto' : '0'
          }}>
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em'
              }}>
                {isLogin || showForgotPassword || showResetPassword ? 'WELCOME BACK!' : 'JOIN US!'}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: '1.5',
                maxWidth: '90%'
              }}>
                {isLogin || showForgotPassword || showResetPassword
                  ? 'Login now and enjoy finding your new travel destination'
                  : 'Create your account and start your journey with us today'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}