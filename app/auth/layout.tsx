"use client"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div>
        {children}
      </div>

    </div>
  )
}