"use client"
import { AddIcon } from "@/components/icons/AddIcon";
import { CommentIcon } from "@/components/icons/CommentIcon";
import { Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

function StepCard({ expanded = false, indicator = true, styles = "" }: { expanded: boolean, indicator: boolean, styles: string }) {
  const [xpanded, setXpanded] = useState(expanded)
  return (
    <div className={`relative cursor-pointer max-w-2xl pb-4 ${styles}`} onClick={() => setXpanded(!xpanded)}>
      <Card>
        <CardBody>
          <p className={`${xpanded ? 'h-24' : ''}`}>Start (Idea)</p>
        </CardBody>
      </Card>
      {indicator && <div className="absolute h-10 w-4 border-dotted border-l-2 border-b-2 left-12"></div>}
    </div>
  )
}

function JourneyCard() {
  return (
    <Card>
      <CardHeader>
        <div className="p-6 w-full">
          <Textarea
            label="When have you reached product market fit?"
            labelPlacement="outside"

            className="max-w-full"
          />
        </div>

      </CardHeader>
      <CardBody>

        <div className="py-3 pl-10">
          <StepCard expanded={false} indicator styles="" />


          <StepCard expanded indicator styles="relative  left-16 w-[calc(100%-64px)]" />



          <StepCard expanded={false} indicator styles="relative left-32 w-[calc(100%-128px)]" />



          <StepCard expanded={false} indicator={false} styles="relative left-48 w-[calc(100%-192px)]" />
        </div>



      </CardBody>

      <CardFooter>
        <div className="flex justify-end w-full items-end px-10 gap-5">
          <Button color="primary">
            Use for an Idea
          </Button>
          <Button>
            Comment <CommentIcon fill="#000" width={30} height={30} size={30} />
          </Button>

        </div>
      </CardFooter>
    </Card>
  )
}

function CreateJourney() {
  const [goals, setGoals] = useState([""])
  const changeText = (value: string, index: number) => {
    goals[index] = value
    const newGoals = [...goals]
    const lastVal = newGoals[newGoals.length - 1];

    if (newGoals.length > 2) {
      while (!newGoals[newGoals.length - 1] && !newGoals[newGoals.length - 2]) {
        newGoals.pop();
      }
    }

    if (!!lastVal) {
      newGoals.push("")
    }
    setGoals(newGoals)
  }
  return (
    <div>
      <form onSubmit={() => { }}>
        <Card>
          <CardHeader>
            <div className="w-full">
              <h1>Create Journey</h1>
              <Textarea
                defaultValue={""}
                className="max-w-full"
                id="pmf"
                name="pmf"
                labelPlacement="outside"
                label="How would you describe Product Market Fit?"
              />
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-5">
              <Card>
                <CardBody>
                  <p>Idea.</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="flex flex-col gap-5">
                    {goals.map((x, i) => (
                      <div key={`set-goal-${i + 1}`}>
                        <Textarea

                          className="max-w-full"
                          name="goal"
                          labelPlacement="outside"
                          label={`Goal ${i + 1}`}
                          onValueChange={(val) => changeText(val, i)}
                          value={x}
                        />
                      </div>
                    ))}


                  </div>
                </CardBody>
                <CardFooter>

                </CardFooter>
              </Card>

              <Card>
                <CardBody>
                  <p>Market Fit.</p>
                </CardBody>
              </Card>

            </div>
          </CardBody>
          <CardFooter>
            <div className="flex items-end justify-end w-full">
              <Button color="danger" variant="light">
                Close
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </div>

          </CardFooter>
        </Card>
        <div>


          <div>

          </div>

        </div>
      </form>
    </div>
  )
}

export default function Settings() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <div className="flex justify-end items-center px-6">
        <Button variant="light" isIconOnly onClick={onOpen}> <AddIcon className="h-6 w-6" /></Button>
        <Modal
          isOpen={isOpen}
          placement="top"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <CreateJourney />
              // <form onSubmit={() => { }}>
              //   <>
              //     <ModalHeader className="flex flex-col gap-1">New Learning</ModalHeader>
              //     <ModalBody>
              //       <Textarea
              //         defaultValue={""}
              //         className="max-w-full"
              //         id="learning"
              //         name="learning"
              //       />
              //     </ModalBody>
              //     <ModalFooter>
              //       <Button color="danger" variant="light" onPress={onClose}>
              //         Close
              //       </Button>
              //       <Button type="submit" color="primary" onPress={onClose}>
              //         Add Learning
              //       </Button>
              //     </ModalFooter>
              //   </>
              // </form>

            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="p-6 pt-10 flex flex-col gap-8">

        <JourneyCard />
        <JourneyCard />

        {/* <Card>
          <CardHeader>
            <div className="p-6 w-full">
              <Textarea
                label="When have you reached product market fit?"
                labelPlacement="outside"

                className="max-w-full"
              />
            </div>

          </CardHeader>
          <CardBody>

            <div className="py-3 pl-10">
              <StepCard expanded={false} indicator styles="" />


              <StepCard expanded indicator styles="relative  left-16 w-[calc(100%-64px)]" />



              <StepCard expanded={false} indicator styles="relative left-32 w-[calc(100%-128px)]" />



              <StepCard expanded={false} indicator={false} styles="relative left-48 w-[calc(100%-192px)]" />
            </div>



          </CardBody>

          <CardFooter>
            <div className="flex flex-col w-full items-end px-10 pb-4">
              <Button>
                Comment <CommentIcon fill="#000" width={30} height={30} size={30} />
              </Button>

            </div>
          </CardFooter>
        </Card> */}
      </div>
    </div>

  )
}