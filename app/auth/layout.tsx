"use client"

import { useAuthContext } from "@/services/auth/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { auth } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (auth?.user) {
      router.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user])
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        {children}
      </div>

    </div>
  )
}