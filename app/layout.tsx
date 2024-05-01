import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StoreProvider } from "@/app/store/StoreProvider"
import { Toaster } from "react-hot-toast"
import AuthProvider from "@/app/store/AuthProvider"
import MainLayout from "@/app/components/layouts/MainLayout"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog Website",
  description: "Blog website created with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang="en" data-theme="light">
        <body className={inter.className}>
          <AuthProvider>
            <MainLayout>
              <div className="min-h-screen bg-gray-100 p-4">{children}</div>
            </MainLayout>
            <Toaster />
          </AuthProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
