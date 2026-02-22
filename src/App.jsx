
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Componend/Layout/Layout';
import Home from './Componend/Home/Home';
import Notfound from './Componend/Notfound/Notfound';
import Login from './Componend/Logen/Login';
import Register from './Componend/Register/Register';
import { HeroUIProvider } from "@heroui/react";
import ContextTokenProvider from './Componend/Context/contextToken';
import Profile from './Componend/Profile/Profile';
import ProtectedRouter from './Componend/ProtectedRouter/ProtectedRouter';
import AuthProutectedRouser from './Componend/ProtectedRouter/AuthProuterRouser';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AllCommentPost from './Componend/AllCommentPost/AllCommentPost';
import { ToastContainer } from 'react-toastify';

import { Offline } from 'react-detect-offline';
import OflineNet from './Componend/OflineNet/OflineNet';

const query = new QueryClient()
const router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { path: "", element: <ProtectedRouter><Home /></ProtectedRouter> },
      { path: "home", element: <ProtectedRouter><Home /></ProtectedRouter> },
      { path: "profile", element: <ProtectedRouter><Profile /></ProtectedRouter> },
      { path: "AllCommentPost/:id", element: <ProtectedRouter><AllCommentPost /></ProtectedRouter> },

      { path: "login", element: <AuthProutectedRouser><Login /></AuthProutectedRouser> },
      { path: "register", element: <AuthProutectedRouser><Register /></AuthProutectedRouser> },

      { path: "*", element: <Notfound /> },

    ]
  }
])


export default function App() {
  


  
  
  return (
    <QueryClientProvider client={query}>

      <HeroUIProvider >

        <ContextTokenProvider>
        
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />

          <Offline>
            <OflineNet/>
          </Offline>
          



        </ContextTokenProvider>
      </HeroUIProvider>
    </QueryClientProvider>





  )
}
