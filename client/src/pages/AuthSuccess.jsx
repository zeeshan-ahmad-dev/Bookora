import React from 'react'
import { Link } from 'react-router-dom'

const AuthSuccess = () => {
  return (
    <div>
        User logged in
        <Link to="/">Back</Link>
    </div>
  )
}

export default AuthSuccess