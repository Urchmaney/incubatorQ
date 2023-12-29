'use client'

import { AuthContextProvider } from '@/services/auth/auth.context'
import { IdeaContextProvider } from '@/services/repo/idea.context'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        <IdeaContextProvider>
          {children}
        </IdeaContextProvider>
      </AuthContextProvider>
    </NextUIProvider>
  )
}