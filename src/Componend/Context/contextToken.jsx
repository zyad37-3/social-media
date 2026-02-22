import React, { createContext, useEffect, useState } from 'react'

export const contextToken=createContext()
import { jwtDecode } from "jwt-decode";

export default function ContextTokenProvider ({children}) {
  const [token, settoken] = useState(null)
const [tokenyouserid, settokenyouserid] = useState(null)
    useEffect(()=>{
      if (localStorage.getItem("userToken")){
        settoken(localStorage.getItem("userToken"))

        
        
        
        const tokenyouserbtn=jwtDecode(localStorage.getItem("userToken"))
         console.log(tokenyouserbtn);
        settokenyouserid(tokenyouserbtn.user)
      }
    },[])
    
    console.log(token);
    
  
  return <>
  
    <contextToken.Provider value={{token,settoken,tokenyouserid}}>

    {children}
        
    </contextToken.Provider>
  </>
  
}
