// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/login/login";
import MemberSignUp from "./pages/signup/member_signup";
import OrgSignUp from "./pages/signup/org_signup";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/unauthorized/unauthorized";

function App() {
  const routes = [
    {
      path: "/",
      element: <h1>Welcome to the CMSC 127 SQL Project</h1>
    },
    {
      path: "/log-in",
      element: <LogIn />
    },
    {
      path: "/member-sign-up",
      element: <MemberSignUp />
    },
    {
      path: "/org-sign-up",
      element: <OrgSignUp />
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />
    },
    {
      path: "/user-home",
      element: (
        <RequireAuth allowedRole="member">
          <h1>User Home Page</h1>
        </RequireAuth>
      )
    }
  ]
  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
