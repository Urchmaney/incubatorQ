"use client"
import { ChevronDown } from "@/components/icons/ChevronIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { Navbar, NavbarBrand, User, NavbarContent, Dropdown, NavbarItem, DropdownTrigger, Link, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardSegmentLayout({
  children,
}: {
  children: ReactNode
}) {

  const { auth } = useAuthContext();
  const router = useRouter();
  const path = usePathname();

  const currentPath = path.split("/")[2]

  const logOut = () => {
    auth?.logout();
    router.push('/auth/login');
  }

  return (
    <div>
      <div>
        <Navbar>
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <User
              name={auth?.user?.displayName}

              avatarProps={{
                src: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
              }}
            />

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
          <NavbarContent justify="center">
            <NavbarItem isActive={currentPath === 'journey' }>
              <Link href="/dashboard/journey" color="foreground" isBlock aria-current="page">Journey</Link>
            </NavbarItem>

            <NavbarItem isActive={currentPath === undefined}>
              <Link href="/dashboard" color="foreground"  isBlock>Ideas</Link>
            </NavbarItem>

            <NavbarItem isActive={ currentPath === 'team'}>
              <Link href="/dashboard" color="foreground"  isBlock>Team</Link>
            </NavbarItem>
            {/* <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={<ChevronDown fill="currentColor" size={16} />}
                    radius="sm"
                    variant="light"
                  >
                    Ideas
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Ideas"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >

                <DropdownItem
                  key="autoscaling"
                >
                  Under work
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </NavbarContent>
          <NavbarContent justify="end">
            {
              auth?.user &&
              <Button onClick={logOut}>
                Logout
              </Button>
            }

          </NavbarContent>
        </Navbar>
      </div>
      {children}
    </div>
  )
}