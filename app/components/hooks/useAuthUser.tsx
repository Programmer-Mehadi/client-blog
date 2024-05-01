"use client"
import { baseUrl } from "@/app/components/shared/baseUrl"
import axios from "axios"
import { useEffect, useState } from "react"

const useAuthUserDetails = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("blog-token")
      setLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/user/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setData({
          user: response.data.data,
          token: token,
        })
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (localStorage.getItem("blog-token")) {
      fetchData()
    }
  }, [])

  return { loading, error, data }
}

export default useAuthUserDetails
