"use client"

import { useRouter } from "next/navigation"
import React from "react"

const SearchSection = () => {
  const router = useRouter()
  const [value, setValue] = React.useState("")
  const submitSearch = () => {
    if (value) {
      router.push(`/?search=${value}`)
    }
  }
  return (
    <div className="py-10 w-full max-w-[500px] mx-auto flex gap-1">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md text-slate-800"
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="btn btn-primary text-white" onClick={submitSearch}>
        Search
      </p>
    </div>
  )
}

export default SearchSection
