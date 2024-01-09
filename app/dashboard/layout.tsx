"use client"

import { useAuthContext } from "@/services/auth/auth.context";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react"
import { useRouter as useRouterRouter } from "next/router";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
//   const routerRouter = useRouterRouter();
  const path = usePathname();
  const { auth } = useAuthContext();

  
  
  useEffect(() => {
    if(path === "/dashboard/journey" || auth?.user) {
      return
    }
    router.push('/auth/login')
  }, [auth?.user])
  return (
    <div>
      {children}
    </div>
  )
}

