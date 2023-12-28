"use client"
import { BackArrowIcon } from "@/components/icons/BackArrowIcon"
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function IdeaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();


  let pathname = usePathname()
  pathname = pathname.split('/')[3]

  return (
    <div>
      <div>
        <Navbar>
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Button onClick={() => router.push('/dashboard')}>
              <BackArrowIcon className="" />
              <p className="font-bold text-inherit">IncubatorQ</p>
            </Button>
            
          </NavbarBrand>
          {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
          </NavbarContent> */}
          <NavbarContent justify="end">
            <NavbarItem isActive={pathname === 'mentor'}>
              <Link color="foreground" aria-current="page" href="#">
                Book a Mentor / Expert
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={pathname === 'release'}>
              <Button as={Link} href="/dashboard/idea/release" variant="flat" color={pathname === 'release' ? `primary` : 'default'}>Releases</Button>
            </NavbarItem>
            <NavbarItem isActive={pathname === 'assumptions'}>
              <Button as={Link} href="/dashboard/idea/assumptions" variant="flat" color={pathname === 'assumptions' ? `primary` : 'default'} >
                Assumptions
              </Button>
            </NavbarItem>

            <NavbarItem isActive={pathname === 'learnings'}>
              <Button as={Link} href="/dashboard/idea/learnings" variant="flat" color={pathname === 'learnings' ? `primary` : 'default'} >
                Learnings
              </Button>
            </NavbarItem>

            <NavbarItem isActive={pathname === 'problem'}>
              <Button as={Link} href="/dashboard/idea/problem" variant="flat" color={pathname === 'problem' ? `primary` : 'default'}>
                Problem
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}