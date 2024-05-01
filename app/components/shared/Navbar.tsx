"use client"

import { RootState } from "@/app/store/store"
import Link from "next/link"
import React from "react"
import { useSelector } from "react-redux"

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth)

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn text-slate-800 bg-transparent shadow-none border-0 hover:shadow-none hover:border-0 hover:bg-transparent text-xl">
            Blog Website
          </a>
        </div>
        {currentUser === null ? (
          <div>
            <ul
              tabIndex={0}
              className="flex gap-4 z-[1] p-2 shadow-none border-0 text-slate-800 bg-base-100 rounded-box mr-1"
            >
              <li>
                <Link href={"/"} className="justify-between">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/dashboard" className="justify-between">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <p className="justify-between">Profile</p>
                </li>
                <li>
                  <p>Settings</p>
                </li>
                <li>
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
