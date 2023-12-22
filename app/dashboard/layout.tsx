"use client"

import { ReactNode } from "react"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div>
      <div>Navbar</div>
      {children}
    </div>
  )
}

