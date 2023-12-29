"use client"

import { AddIcon } from "@/components/icons/AddIcon"
import { BackArrowIcon } from "@/components/icons/BackArrowIcon"
import { ChevronDown } from "@/components/icons/ChevronIcon"
import { useAuthContext } from "@/services/auth/auth.context"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Navbar, NavbarBrand, NavbarContent, NavbarItem, User, useDisclosure } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Dashboard() {

  const { auth } = useAuthContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
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

                <DropdownItem
                  key="autoscaling"


                >
                  Under work
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarContent justify="end">
            <Button onClick={logOut}>
              Logout
            </Button>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="flex justify-between flex-wrap gap-8 pt-14">
        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md cursor-pointer">
          <Link className="text-xl" href="dashboard/idea/release">InnovatorQ</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl cursor-pointer">
          <Link className="text-xl" href="dashboard/idea/release">Linsight</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl cursor-pointer">
          <Link className="text-xl" href="dashboard/idea/release">Pinzera</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl cursor-pointer" onClick={onOpen}>
          <AddIcon className="" />

          <Modal
            isOpen={isOpen}
            placement="top"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Idea</ModalHeader>
                  <ModalBody>
                    <Input
                      type="text"
                      placeholder=""
                  
                      color='primary'
                      name='ideaname'
                      id='ideaname'
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Create
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>

    </div>
  )
}