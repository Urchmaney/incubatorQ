"use client"

import { AddIcon } from "@/components/icons/AddIcon"
import { BackArrowIcon } from "@/components/icons/BackArrowIcon"
import { ChevronDown } from "@/components/icons/ChevronIcon"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from "@nextui-org/react"

export default function Dashboard() {
  return (
    <div>
      <div>
        <Navbar>
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <User
              name="Jane Doe"

              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
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
            <Dropdown>
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
                <div></div>
                {/* <DropdownItem
                key="autoscaling"
                description="First Idea."
                
              >
                Autoscaling
              </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarContent>

          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex justify-between flex-wrap gap-8 pt-14">
        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md">
          <Link className="text-xl" href="dashboard/idea/release">InnovatorQ</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl">
          <Link className="text-xl" href="dashboard/idea/release">Linsight</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl">
          <Link className="text-xl" href="dashboard/idea/release">Pinzera</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl">
          <AddIcon className="" />
        </div>
      </div>

    </div>
  )
}