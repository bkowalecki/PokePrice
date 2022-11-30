import React from 'react'
import './Header.css'

const Header = ({user, logout, deleteUserFromDB}) => {
  return (
    <div className="header-banner">

      <div>Hello, {user.username}</div>

      <div className='header-options'>

        <div className='delete-user-btn' onClick={deleteUserFromDB}>
            Delete Account
        </div>
        <div className="logout-btn" onClick={logout}>
          Logout
        </div>
      
      </div>
      
    </div>
  )
}

export default Header