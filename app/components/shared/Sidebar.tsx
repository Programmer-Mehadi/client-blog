"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
const sidebarData = [
  {
    text: "Profile",
    link: "/dashboard/profile",
    children: [
      {
        text: "Edit Profile",
        link: "/dashboard/profile/edit",
      },
    ],
  },
  {
    text: "Blog",
    link: "/dashboard/blog",
    children: [
      {
        text: "Add Blog",
        link: "/dashboard/blog/add",
      },
      {
        text: "Blog List",
        link: "/dashboard/blog/list",
      },
    ],
  },
  {
    text: "Comment",
    link: "/dashboard/comment",
    children: [
      {
        text: "Comment List",
        link: "/dashboard/comment/list",
      },
    ],
  },
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState<any>("")

  //  get curent path name
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.includes("profile")) {
      setIsOpen("Profile")
    } else if (pathname.includes("blog")) {
      setIsOpen("Blog")
    } else if (pathname.includes("comment")) {
      setIsOpen("Comment")
    }
  }, [pathname])

  return (
    <>
      {sidebarData.map((item) => (
        <li key={item.text}>
          <Link
            href={item.link}
            className={isOpen === item.text ? "active" : ""}
          >
            {item.text}
          </Link>
          {item.children && (
            <ul className={isOpen === item.text ? "pl-4" : "hidden pl-4"}>
              {item.children.map((child) => (
                <li key={child.text}>
                  <Link href={child.link}>{child.text}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  )
}

export default Sidebar
