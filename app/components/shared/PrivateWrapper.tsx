import Loader from "@/app/components/shared/Loader"
import React from "react"

const PrivateWrapper = ({
  children,
  currentUser,
}: {
  children: React.ReactNode
  currentUser: any
}) => {
  return (
    <>
      {currentUser.loading ? (
        <Loader />
      ) : (
        <>{currentUser.user ? <Loader /> : <>{children}</>}</>
      )}
    </>
  )
}

export default PrivateWrapper
