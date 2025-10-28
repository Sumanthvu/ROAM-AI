"use client"
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import React from "react"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const isActiveRoute = (path) => {
    return location.pathname === path
  }

  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(15, 23, 42, 0.98)",
    borderBottom: "1px solid rgba(55, 65, 81, 0.1)",
    backdropFilter: "blur(8px)",
    height: "72px",
  }

  const containerStyle = {
    maxWidth: "90rem",
    margin: "0 auto",
    padding: "0 2rem",
  }

  const headerContentStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "72px",
  }

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: "0.5rem",
    borderRadius: "0.75rem",
    marginLeft: "-0.5rem",
  }

  const logoBadgeStyle = {
    width: "2rem",
    height: "2rem",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(1)",
    transition: "all 0.3s ease",
  }

  const logoBadgeHoverStyle = {
    ...logoBadgeStyle,
    transform: "scale(1.1) rotate(-5deg)",
    boxShadow: "0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
  }

  const logoTextStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#e2e8f0",
    marginLeft: "0.5rem",
    transition: "all 0.3s ease",
  }

  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  }

  const welcomeStyle = {
    display: "flex",
    alignItems: "center",
    color: "#94a3b8",
    fontSize: "0.875rem",
    fontWeight: "500",
  }

  const navLinkStyle = {
    color: "#94a3b8",
    fontWeight: "500",
    fontSize: "0.9375rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    position: "relative",
    isolation: "isolate",
  }

  const navLinkHoverStyle = {
    ...navLinkStyle,
    color: "#e2e8f0",
    background: "rgba(148, 163, 184, 0.1)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(148, 163, 184, 0.05)",
  }

  const navLinkActiveStyle = {
    ...navLinkStyle,
    color: "#e2e8f0",
    background: "rgba(148, 163, 184, 0.15)",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
  }

  const navLinkActiveHoverStyle = {
    ...navLinkActiveStyle,
    ...navLinkHoverStyle,
  }

  const logoutIconStyle = {
    color: "#94a3b8",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "1.5rem",
    height: "1.5rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const logoutIconHoverStyle = {
    ...logoutIconStyle,
    color: "#e2e8f0",
    background: "rgba(239, 68, 68, 0.1)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.05)",
  }

  const registerButtonStyle = {
    padding: "0.625rem 1.25rem",
    borderRadius: "0.75rem",
    background: "linear-gradient(to right, #2563eb, #06b6d4)",
    color: "white",
    fontWeight: "600",
    border: "1px solid rgba(37, 99, 235, 0.5)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: "scale(1)",
    textDecoration: "none",
    display: "inline-block",
    boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)",
  }

  const registerButtonHoverStyle = {
    ...registerButtonStyle,
    background: "linear-gradient(to right, #1d4ed8, #0891b2)",
    boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.4)",
    transform: "scale(1.05)",
  }

  const mainStyle = {
    minHeight: "calc(100vh - 72px)",
    background: "#0f172a",
    position: "relative",
    overflow: "hidden",
  }

  const mainOverlayStyle = {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05), transparent 70%)",
    pointerEvents: "none",
  }

  const mainContentStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "3rem 1rem",
    position: "relative",
    zIndex: 10,
  }

  const [logoHover, setLogoHover] = React.useState(false)
  const [dashboardHover, setDashboardHover] = React.useState(false)
  const [profileHover, setProfileHover] = React.useState(false)
  const [loginHover, setLoginHover] = React.useState(false)
  const [registerHover, setRegisterHover] = React.useState(false)
  const [logoutHover, setLogoutHover] = React.useState(false)

  return (
    <>
      <motion.header
        style={headerStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={containerStyle}>
          <div style={headerContentStyle}>
            <Link
              to="/"
              style={logoContainerStyle}
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              <div style={logoHover ? logoBadgeHoverStyle : logoBadgeStyle}>
                <span style={{ color: "white", fontWeight: "bold", fontSize: "1.125rem" }}>R</span>
              </div>
              <span style={logoTextStyle}>Roam AI</span>
            </Link>

            <nav style={navStyle}>
              {isAuthenticated ? (
                <>
                  <div style={welcomeStyle}>
                    Welcome,{" "}
                    <span style={{ color: "#60a5fa", fontWeight: "600", marginLeft: "0.5rem" }}>{user?.userName}!</span>
                  </div>

                  <Link
                    to="/dashboard"
                    style={
                      isActiveRoute("/dashboard")
                        ? dashboardHover
                          ? navLinkActiveHoverStyle
                          : navLinkActiveStyle
                        : dashboardHover
                        ? navLinkHoverStyle
                        : navLinkStyle
                    }
                    onMouseEnter={() => setDashboardHover(true)}
                    onMouseLeave={() => setDashboardHover(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    style={
                      isActiveRoute("/profile")
                        ? profileHover
                          ? navLinkActiveHoverStyle
                          : navLinkActiveStyle
                        : profileHover
                        ? navLinkHoverStyle
                        : navLinkStyle
                    }
                    onMouseEnter={() => setProfileHover(true)}
                    onMouseLeave={() => setProfileHover(false)}
                  >
                    My Profile
                  </Link>

                  <ArrowRightOnRectangleIcon
                    onClick={handleLogout}
                    style={logoutHover ? logoutIconHoverStyle : logoutIconStyle}
                    onMouseEnter={() => setLogoutHover(true)}
                    onMouseLeave={() => setLogoutHover(false)}
                  />
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={loginHover ? navLinkHoverStyle : navLinkStyle}
                    onMouseEnter={() => setLoginHover(true)}
                    onMouseLeave={() => setLoginHover(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    style={registerHover ? registerButtonHoverStyle : registerButtonStyle}
                    onMouseEnter={() => setRegisterHover(true)}
                    onMouseLeave={() => setRegisterHover(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      <motion.main 
        style={mainStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={mainOverlayStyle}></div>
        <motion.div 
          style={mainContentStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </>
  )
}

export default Layout
