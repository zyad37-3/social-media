import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({children}) {
    
  if (localStorage.getItem("userToken")!==null){
    return <>{children}</>
  }else{
    return <Navigate to="/login"/> 
  }
}
