// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/login/login";

function App() {
  const routes = [
    {
      path: "/",
      element: <h1>Welcome to the CMSC 127 SQL Project</h1>
    },
    {
      path: "/login",
      element: <LogIn />
    },
  ]
  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
