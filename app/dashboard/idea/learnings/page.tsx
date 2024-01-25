"use client"
import { AddIcon } from "@/components/icons/AddIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { Learning } from "@/services/repo/IAppRepo";
import { useIdeaContext } from "@/services/repo/idea.context";
import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";

export default function Learnings() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { ideaRepo, activeIdea } = useIdeaContext();
  const [learnings, setLearnings] = useState<Learning[]>([]);

  useEffect(() => {
    ideaRepo?.getIdeaLearnings(activeIdea?.id || "").then(fLearnings => {
      setLearnings(fLearnings)
    })
  }, [learnings.length])

  const AddLearning = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    ideaRepo?.addIdeaLearning(activeIdea?.id || "", formData.get('learning')?.toString() || "");
    setLearnings([]);
  }
  return (
    <div className="p-6">
      <div>
        <div className="flex flex-col gap-10">
          <div className="flex justify-end items-center">
            <Button variant="light" isIconOnly onClick={onOpen}> <AddIcon classname="h-6 w-6" /></Button>
            <Modal
              isOpen={isOpen}
              placement="top"
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <form onSubmit={AddLearning}>
                    <>
                      <ModalHeader className="flex flex-col gap-1">New Learning</ModalHeader>
                      <ModalBody>
                        <Textarea
                          defaultValue={""}
                          className="max-w-full"
                          id="learning"
                          name="learning"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button type="submit" color="primary" onPress={onClose}>
                          Add Learning
                        </Button>
                      </ModalFooter>
                    </>
                  </form>

                )}
              </ModalContent>
            </Modal>
          </div>
          <div className="flex flex-col gap-5">
            {
              learnings.map(learning => (
                <Card key={`learning-${learning.id}`}>
                  <CardBody>
                    <p>{learning.content}</p>
                  </CardBody>
                </Card>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}