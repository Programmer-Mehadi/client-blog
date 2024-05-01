"use client"

import { baseUrl } from "@/app/components/shared/baseUrl"
import { RootState } from "@/app/store/store"
import axios from "axios"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import PrivateWrapper from "@/app/components/shared/PrivateWrapper"

const page = () => {
  const router = useRouter()
  const { currentUser } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    profileImg: "",
  })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    profileImg?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    axios
      .post(`${baseUrl}/auth/register`, formData)
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res.data.message)
          setFormData({
            email: "",
            name: "",
            password: "",
            profileImg: "",
          })
          setErrors({})
          router.push("/auth/login", { scroll: false })
        }
      })
      .catch((err) => {
        if (err?.response?.data?.success === false) {
          if (err?.response?.data?.errorMessages) {
            let _errors: any = {}
            err?.response?.data?.errorMessages.forEach(
              (error: { path: string; message: string }) => {
                _errors[error.path] = error.message
              }
            )
            setErrors(_errors)
          }
          if (err?.response?.data?.message) {
            toast.error(err.response.data.message)
          }
        }
      })
  }

  useEffect(() => {
    if (currentUser.user) {
      router.push("/dashboard", { scroll: false })
    }
  }, [currentUser])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cyan-900 p-4">
      <PrivateWrapper currentUser={currentUser}>
        <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border rounded py-2 px-3 text-slate-700"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border rounded py-2 px-3 text-slate-700"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border rounded py-2 px-3 text-slate-700"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="profileImg"
            >
              Profile Image URL
            </label>
            <input
              className="w-full border rounded py-2 px-3 text-slate-700"
              type="text"
              name="profileImg"
              id="profileImg"
              value={formData.profileImg}
              onChange={handleChange}
            />
            {errors.profileImg && (
              <p className="text-red-500">{errors.profileImg}</p>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>{" "}
      </PrivateWrapper>
    </div>
  )
}

export default page
