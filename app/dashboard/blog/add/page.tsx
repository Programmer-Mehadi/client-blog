"use client"
import { baseUrl } from "@/app/components/shared/baseUrl"
import RichTextComponent from "@/app/dashboard/blog/add/_sections/RichTextComponent"
import { RootState } from "@/app/store/store"
import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"

const page = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth)
  const [inserting, setInserting] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    imageUrl: "",
    content: "",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const setContentData = (data: any) => {
    setFormData({
      ...formData,
      content: data,
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Handle form submission
    setInserting(true)
    if (
      !formData.title ||
      !formData.videoUrl ||
      !formData.imageUrl ||
      !formData.content
    ) {
      setErrors({
        title: !formData.title ? "Title is required" : null,
        videoUrl: !formData.videoUrl ? "Video URL is required" : null,
        imageUrl: !formData.imageUrl ? "Image URL is required" : null,
        content: !formData.content ? "Content is required" : null,
      })
      return
    }
    await axios
      .post(
        baseUrl + "/blog/create",
        {
          title: formData.title,
          videoUrl: formData.videoUrl,
          imageUrl: formData.imageUrl,
          content: formData.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message)
          setFormData({
            title: "",
            videoUrl: "",
            imageUrl: "",
            content: "",
          })
        } else {
          toast.error(res?.data?.message)
        }
        setInserting(false)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
        setInserting(false)
      })
  }

  return (
    <div className="p-4 w-full mx-auto max-w-[600px] shadow">
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label
            htmlFor="videoUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
          />
          {errors.videoUrl && <p className="text-red-500">{errors.videoUrl}</p>}
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
          />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            cols={30}
            rows={10}
            className="w-full"
            name="content"
            id="content"
            value={formData.content}
            onChange={(e) => setContentData(e.target.value)}
          ></textarea>

          {errors.content && <p className="text-red-500">{errors.content}</p>}
          {/* <RichTextComponent
            content={formData.content}
            setContentData={setContentData}
          /> */}
        </div>
        <button
          disabled={inserting}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default page
