"use client"
import { ChevronDown } from "@/components/icons/ChevronIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { Invitation } from "@/services/repo/IAppRepo";
import { useIdeaContext } from "@/services/repo/idea.context";
import { Navbar, NavbarBrand, User, NavbarContent, Dropdown, NavbarItem, DropdownTrigger, Link, Button, DropdownMenu, DropdownItem, Badge, Avatar, DropdownSection, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { Key, ReactNode, useEffect, useState } from "react";

export default function DashboardSegmentLayout({
  children,
}: {
  children: ReactNode
}) {

  const { auth } = useAuthContext();
  const { ideaRepo } = useIdeaContext();
  const router = useRouter();
  const path = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [selectedInvite, setSelectedInvite] = useState<Invitation | null>(null);

  useEffect(() => {
    if (!auth?.user) return;

    ideaRepo?.getUserInvitations(auth.user.email).then(invites => {
      setInvitations(invites);
    }).catch(e => {
      console.log(e)
    })

  }, [invitations.length])

  const currentPath = path.split("/")[2]

  const logOut = () => {
    auth?.logout();
    router.push('/auth/login');
  }

  const selectInvitation = (key: Key) => {
    setSelectedInvite(invitations.find(v => v?.id === key.toString() ) || null);
    onOpen();
  }

  const acceptInvitation = () => {
    ideaRepo?.acceptInvitation(selectedInvite!, {
      userId: auth?.user?.userId || "",
      username: auth?.user?.displayName || "",
      email: auth?.user?.email || ""
    }).then(() => setInvitations([]));
    onClose();
  }

  const cancelInvitation = () => {
    ideaRepo?.cancelInvitation(selectedInvite!, {
      userId: auth?.user?.userId || "",
      username: auth?.user?.displayName || "",
      email: auth?.user?.email || ""
    }).then(() => setInvitations([]));
    onClose();
  }

  return (
    <div>
      <div>
        <Navbar>
          <NavbarBrand>
            {/* <AcmeLogo /> */}

            {/* <User
              name={auth?.user?.displayName}

              avatarProps={{
                src: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
              }}
            /> */}
            {auth?.user && <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex items-center cursor-pointer">
                  <Badge content={invitations.length} color="primary" variant="flat" isInvisible={invitations.length <= 0}>
                    <Avatar src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740" />
                    {/* <User
                name={auth?.user?.displayName}

                avatarProps={{
                  src: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
                }}
              /> */}
                  </Badge>
                  <p className="text-sm">{auth?.user?.displayName}</p>
                </div>

              </DropdownTrigger>
              <DropdownMenu aria-label="Invitations" variant="flat" items={invitations.map(x => ({ key: x.id, idea: x.idea }))} onAction={ selectInvitation }>
                {
                  (invitation) => (
                    <DropdownItem key={invitation.key}>
                      Invitation to Join <span className="font-bold">{invitation.idea}</span>
                    </DropdownItem>)
                }



                {/* {
                  invitations.map((invite) => (
                    <DropdownSection>
                      <DropdownItem key="profile" className="h-20 gap-2">
                        <div className="flex flex-col gap-3 p-2 pt-5">
                          <p className="font-normal">Invitation to Join <span className="font-bold">Pinzera</span></p>
                          <div className="flex gap-5">
                            <Button color="primary">Accept</Button>
                            <Button>Reject</Button>
                          </div>
                        </div>

                      </DropdownItem>
                    </DropdownSection>
                  ))
                } */}
                {/* <DropdownSection>
                  <DropdownItem key="profile" className="h-20 gap-2">
                    <div className="flex flex-col gap-3 p-2 pt-5">
                      <p className="font-normal">Invitation to Join <span className="font-bold">Pinzera</span></p>
                      <div className="flex gap-5">
                        <Button color="primary">Accept</Button>
                        <Button>Reject</Button>
                      </div>
                    </div>

                  </DropdownItem>
                </DropdownSection>




                <DropdownSection>
                  <DropdownItem key="profile" className="h-20 gap-5">
                    <div className="flex flex-col gap-3 p-2 pt-5">
                      <p className="font-normal">Invitation to Join <span className="font-bold">Pinzera</span></p>
                      <div className="flex gap-5">
                        <Button color="primary">Accept</Button>
                        <Button>Reject</Button>
                      </div>
                    </div>

                  </DropdownItem>
                </DropdownSection> */}

              </DropdownMenu>
            </Dropdown>
            }

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
            <NavbarItem isActive={currentPath === 'journey'}>
              <Link href="/dashboard/journey" color="foreground" isBlock aria-current="page">Journey</Link>
            </NavbarItem>

            <NavbarItem isActive={currentPath === undefined}>
              <Link href="/dashboard" color="foreground" isBlock>Ideas</Link>
            </NavbarItem>

            <NavbarItem isActive={currentPath === 'teams'}>
              <Link href="/dashboard/teams" color="foreground" isBlock>Team</Link>
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
      <Modal
        isOpen={isOpen}
        placement="top"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className="py-5">
                  Invitation to join the idea:  <span  className="font-bold">{ selectedInvite?.idea }</span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={cancelInvitation}>
                  Cancel
                </Button>
                <Button color="primary" onPress={acceptInvitation}>
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {children}
    </div>
  )
}