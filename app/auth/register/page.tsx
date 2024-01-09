"use client"

import { EyeFilledIcon } from '@/components/icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/icons/EyeSlashFilledIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { useAuthContext } from '@/services/auth/auth.context';
import { useTrackingContext } from '@/services/tracking/trackering.context';
import { Button } from '@nextui-org/button';
import { Input, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function Register() {
  const { auth } = useAuthContext();
  const router = useRouter();
  const { tracker } = useTrackingContext();

  useEffect(() => {
    tracker?.trackRegisterPageView();
  }, [tracker])

  const RegisterUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    // const form_values = Object.fromEntries(formData);
    const result = await auth?.register(
      formData.get("email")?.toString() || "", 
      formData.get("password")?.toString() || "", 
      formData.get("full_name")?.toString() || ""
    )
    if (result && result?.length <= 0) {
      tracker?.trackRegisterClicked();
      router.replace('/dashboard');
    }
  }


  return (
    <div>
      <form onSubmit={RegisterUser}>
        <div className="px-10 py-10 bg-gray-300 min-w-[550px] flex flex-col gap-5">

          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="Kingsley"
              labelPlacement="outside"
              color='default'
              name='full_name'
              id='full_name'
            // startContent={
            //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            // }
            />

          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              labelPlacement="outside"
              color='default'
              name='email'
              id='email'
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
              color='default'
              name='password'
              id='password'
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
                color='foreground'
                href="/auth/login">Already a user? Sign in</Link>
            </div>
            <Button
              type='submit'
              fullWidth
              color='primary'
            >Register</Button>
          </div>

        </div>
      </form>
    </div>

  )
}