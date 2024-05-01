"use client"
import useAuthUserDetails from "@/app/components/hooks/useAuthUser"
import Loader from "@/app/components/shared/Loader"
import { setUser } from "@/app/store/authSlice"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading = true, error, data } = useAuthUserDetails()
  const dispatch = useDispatch()

  useEffect(() => {
    setUser({
      user: null,
      token: null,
      loading: true,
    })
  }, [])

  useEffect(() => {
    if (!loading) {
      // console.log(data)
      if (data) {
        dispatch(
          setUser({
            ...data,
            loading: false,
          })
        )
      }
    }
  }, [loading, error])

  if (loading) {
    return
  }
  return (
    <>
      {loading ? (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cyan-900 p-4">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default AuthProvider
