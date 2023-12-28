"use client"

import { useAuthContext } from "@/services/auth/auth.context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const { auth } = useAuthContext();
  useEffect(() => {
    if(!auth?.user) {
      router.push('/auth/login')
    }
  }, [])
  return (
    <div>
      {children}
    </div>
  )
}

