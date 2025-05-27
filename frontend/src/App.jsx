// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/login/Login";
import MemberSignUp from "./pages/signup/Member_Signup";
import OrgSignUp from "./pages/signup/Org_Signup";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import OrgHome from "./pages/org-home/OrgHome";
import OrgFees from "./pages/org-fees/OrgFees";
import OrgMembers from "./pages/org-members/OrgMembers";
import AddMember from "./pages/org-members/AddMember";
import DeleteMember from "./pages/org-members/DeleteMember";
import EditMember from "./pages/org-members/EditMember";
import UserHome from "./pages/user-home/UserHome";
import UserFees from "./pages/user-fees/UserFees";
import UserProfile from "./pages/user-profile/UserProfile";
import AddFee from "./pages/org-fees/AddFee";
import DeleteFee from "./pages/org-fees/DeleteFee";
import UpdateFee from "./pages/org-fees/UpdateFee";

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
          <UserHome />
        </RequireAuth>
      )
    },
    {
      path: "/user-fees",
      element: (
        <RequireAuth allowedRole="member">
          <UserFees />
        </RequireAuth>
      )
    },
    {
      path: "/add-fee",
      element: (
        <RequireAuth allowedRole="organization">
          <AddFee />
        </RequireAuth>
      )
    },
    {
      path: "/update-fee",
      element: (
        <RequireAuth allowedRole="organization">
          <UpdateFee />
        </RequireAuth>
      )
    },
    {
      path: "/delete-fee",
      element: (
        <RequireAuth allowedRole="organization">
          <DeleteFee />
        </RequireAuth>
      )
    },
    {
      path: "/user-profile",
      element: (
        <RequireAuth allowedRole="member">
          <UserProfile />
        </RequireAuth>
      )
    },
    {
      path: "/org-home",
      element: (
        <RequireAuth allowedRole="organization">
          <OrgHome />
        </RequireAuth>
      )
    },
    {
      path: '/org-fees',
      element: (
        <RequireAuth allowedRole="organization">
          <OrgFees />
        </RequireAuth>
      )
    },
    {
      path: '/add-member',
      element: (
        <RequireAuth allowedRole="organization">
          <AddMember />
        </RequireAuth>
      )
    },
    {
      path: '/delete-member',
      element: (
        <RequireAuth allowedRole="organization">
          <DeleteMember />
        </RequireAuth>
      )
    },
    {
      path: '/edit-member',
      element: (
        <RequireAuth allowedRole="organization">
          <EditMember />
        </RequireAuth>
      )
    },
    {
      path: "/org-members",
      element: (
        <RequireAuth allowedRole="organization">
          <OrgMembers />
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
