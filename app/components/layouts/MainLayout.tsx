import Footer from "@/app/components/shared/Footer"
import Navbar from "@/app/components/shared/Navbar"
import React from "react"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
