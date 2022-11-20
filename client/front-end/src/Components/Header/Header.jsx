import React from 'react'
import './Header.css'

const Header = ({user, logout}) => {
  return (
    <div className="header-banner">
    <div>Hello, {user.username}</div>
    <div className="logout-btn" onClick={logout}>
      Logout
    </div>
  </div>
  )
}

export default Header