'use client'

import { AuthContextProvider } from '@/services/auth/auth.context'
import { IdeaContextProvider } from '@/services/repo/idea.context'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <AuthContextProvider>
        <IdeaContextProvider>
          {children}
        </IdeaContextProvider>
      </AuthContextProvider>
    </NextUIProvider>
  )
}