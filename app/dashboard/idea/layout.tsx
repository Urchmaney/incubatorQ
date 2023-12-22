"use client"
import { BackArrowIcon } from "@/components/icons/BackArrowIcon"
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function IdeaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeMenu, setActiveMenu] = useState("release");
  const router = useRouter();

  const onMenuClick = (val: string) => {
    setActiveMenu(val)
  }
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
            <NavbarItem isActive={activeMenu === 'mentor'}>
              <Link color="foreground" aria-current="page" href="#" onClick={() => onMenuClick('mentor')}>
                Book a Mentor / Expert
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex" isActive={activeMenu === 'release'}>
              <Button as={Link} href="#" variant="flat" color={activeMenu === 'release' ? `primary` : 'default'} onClick={() => onMenuClick('release')}>Releases</Button>
            </NavbarItem>
            <NavbarItem isActive={activeMenu === 'assumpt'}>
              <Button as={Link} href="#" variant="flat" color={activeMenu === 'assumpt' ? `primary` : 'default'} onClick={() => onMenuClick('assumpt')}>
                Assumptions
              </Button>
            </NavbarItem>

            <NavbarItem isActive={activeMenu === 'learn'}>
              <Button as={Link} href="#" variant="flat" color={activeMenu === 'learn' ? `primary` : 'default'}  onClick={() => onMenuClick('learn')}>
                Learnings
              </Button>
            </NavbarItem>

            <NavbarItem isActive={activeMenu === 'problem'}>
              <Button as={Link} href="#" variant="flat" color={activeMenu === 'problem' ? `primary` : 'default'} onClick={() => onMenuClick('problem')}>
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