'use client'

import { AuthContextProvider } from '@/services/auth/auth.context'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </NextUIProvider>
  )
}