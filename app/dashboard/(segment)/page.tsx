"use client"

import { AddIcon } from "@/components/icons/AddIcon"
import { BackArrowIcon } from "@/components/icons/BackArrowIcon"
import { ChevronDown } from "@/components/icons/ChevronIcon"
import { useAuthContext } from "@/services/auth/auth.context"
import { Idea } from "@/services/repo/IAppRepo"
import { useIdeaContext } from "@/services/repo/idea.context"
import { useTrackingContext } from "@/services/tracking/trackering.context"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Navbar, NavbarBrand, NavbarContent, NavbarItem, User, useDisclosure } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

export default function Dashboard() {

  const { auth } = useAuthContext();
  const { ideaRepo, setActiveIdea } = useIdeaContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { tracker } = useTrackingContext();
  const router = useRouter();

  const [userIdeas, setUserIdeas] = useState<Partial<Idea>[]>([])

  useEffect(() => {
    ideaRepo?.getUserIdeas(auth?.user?.userId || "").then(data => {
      setUserIdeas(data);
    })
  }, [userIdeas.length])

  useEffect(() => {
    if (auth?.user) {
      return;
    }

    router.push('/auth/login')
  }, [auth?.user])

  const createIdea = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await ideaRepo?.createUserIdea(
        auth?.user?.userId || "",
        formData.get("ideaname")?.toString() || "",
        auth?.user?.email || "",
        auth?.user?.displayName || ""
        )
    if (result?.idea) {
      setActiveIdea?.(result.idea);
      tracker?.trackCreateNewIdeaClicked();
      router.push('/dashboard/idea/problem')
    }
  }

  const openNewIdeaModal = () => {
    onOpen();
    tracker?.trackAddIdeaClicked();
  }


  const onClickIdea = (idea: Partial<Idea>) => {
    setActiveIdea?.(idea as Idea);
    router.push('/dashboard/idea/release');
  }

  return (
    <div>
      
      <div className="flex justify-start flex-wrap gap-8 pt-14">
        {
          userIdeas.map(x => (
            <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md cursor-pointer" key={`userIdea-${x.id}`} onClick={() => onClickIdea(x)}>
              <Link className="text-xl" href="dashboard/idea/release">{x.name}</Link>
            </div>
          ))
        }
        {/* <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md cursor-pointer">
          <Link className="text-xl" href="dashboard/idea/release">InnovatorQ</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl cursor-pointer">
          <Link className="text-xl" href="dashboard/idea/release">Linsight</Link>
        </div>

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl cursor-pointer">
          <Link className="text-xl" href="dashboard/idea/release">Pinzera</Link>
        </div> */}

        <div className="flex justify-center items-center w-[30%] bg-gray-200 h-[290px] rounded-md text-2xl cursor-pointer" onClick={ openNewIdeaModal }>
          <AddIcon classname="" />

          <Modal
            isOpen={isOpen}
            placement="top"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <form onSubmit={createIdea}>
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
                      <Button type="submit" color="primary" onPress={onClose}>
                        Create
                      </Button>
                    </ModalFooter>
                  </>
                </form>

              )}
            </ModalContent>
          </Modal>
        </div>
      </div>

    </div>
  )
}