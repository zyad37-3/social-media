import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthProutectedRouser({children}) {
  if (localStorage.getItem("userToken")!==null){
 return <Navigate to="/"/>
  }else {
    return <>{children}</>
  }
}
