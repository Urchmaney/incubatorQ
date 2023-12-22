"use client"

import { EyeFilledIcon } from '@/components/icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/icons/EyeSlashFilledIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { Button } from '@nextui-org/button';
import { Input, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <main className="px-10 py-10 bg-gray-300 min-w-[550px] flex flex-col gap-5">

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          color='primary'
          startContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          labelPlacement="outside"
          color='primary'

        />

      </div>

      <div>
      </div>

      <div className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <div>
          <Link
            className='text-sm'
            size='sm'
            underline='always'
            href="/auth/register">Not a member? Register</Link>
        </div>
        <Button
          fullWidth
          color='primary'
          onClick={() => router.push("/dashboard")}
        >Login</Button>
      </div>

    </main>
  )
}