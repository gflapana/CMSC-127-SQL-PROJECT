// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/login/login";
import MemberSignUp from "./pages/signup/member_signup";
import OrgSignUp from "./pages/signup/org_signup";

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
