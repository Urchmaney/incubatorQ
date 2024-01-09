"use client";

import { AddIcon } from "@/components/icons/AddIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { ChevronDown } from "@/components/icons/ChevronIcon";
import { ChevronSideIcon } from "@/components/icons/ChevronSideIcon";
import { CommentIcon } from "@/components/icons/CommentIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { Journey, Step } from "@/services/repo/IAppRepo";
import { useIdeaContext } from "@/services/repo/idea.context";
import { useTrackingContext } from "@/services/tracking/trackering.context";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function StepCard({
  expanded = false, indicator = true, styles = "", step, left = "", indicatorLength = ""
}: { expanded: boolean, indicator: boolean, styles: string, step: Step, left: string, indicatorLength: string }) {

  const [xpanded, setXpanded] = useState(expanded)
  return (
    <div className={`relative cursor-pointer max-w-2xl pb-4 ${styles}`} style={{ left: left }} onClick={() => setXpanded(!xpanded)}>
      <Card>
        <CardBody>
          <div className="flex gap-3">
            <div className="pt-1">
              {xpanded && <ChevronDownIcon fill={"#000"} size={15} />}
              {!xpanded && <ChevronSideIcon fill={"#000"} size={15} />}
            </div>

            <p>{step.name}</p>
          </div>
          {xpanded && <div className="p-3">
            {step.description}
          </div>}
        </CardBody>
      </Card>
      {indicator && <div className={`absolute h-10 border-dotted border-l-2 border-b-2 left-12`} style={{ width: indicatorLength }}></div>}
    </div>
  )
}

function JourneyCard({ journey }: { journey: Journey }) {
  const { tracker } = useTrackingContext();
  return (
    <Card>
      <CardHeader>
        <div className="p-6 w-full">
          <Textarea
            label="When have you reached product market fit?"
            labelPlacement="outside"
            value={journey.pmfDescription}
            className="max-w-full"
          />
        </div>

      </CardHeader>
      <CardBody>

        <div className="py-3 pl-10 le">
          {
            journey.steps.map((x, i) => {
              // const v = `left-[calc((${i}*(100%-675px))/${journey.steps.length})]`
              const v = `calc((${i}*(100% - 675px))/${journey.steps.length})`
              const iLength = `calc(675px / ${journey.steps.length})`
              return (
                <StepCard key={`journey-step-${i}`} expanded={false} indicator={i < journey.steps.length - 1} styles={`relative`} step={x} left={v} indicatorLength={iLength} />
              )
            })
          }


          {/* 
          <StepCard expanded indicator styles="relative  left-16 w-[calc(100%-64px)]" />



          <StepCard expanded={false} indicator styles="relative left-32 w-[calc(100%-128px)]" />



          <StepCard expanded={false} indicator={false} styles="relative left-48 w-[calc(100%-192px)]" /> */}
        </div>
      </CardBody>

      <CardFooter>
        <div className="flex justify-end w-full items-end px-10 gap-5">
          <Button color="primary" onClick={() => tracker?.trackUseIdeaClicked(journey.id)}>
            Use for an Idea
          </Button>
          <Button onClick={() => tracker?.trackCommentJourney(journey.id)}>
            Comment <CommentIcon fill="#000" width={30} height={30} size={30} />
          </Button>

        </div>
      </CardFooter>
    </Card>
  )
}

function CreateJourney({ closeFn }: { closeFn: () => void }) {
  const { ideaRepo } = useIdeaContext();
  const { auth } = useAuthContext();
  const [goals, setGoals] = useState([""])
  const [stageNames, setStageNames] = useState([''])
  const changeText = (value: string, index: number) => {
    goals[index] = value
    const newGoals = [...goals]
    const lastVal = newGoals[newGoals.length - 1];

    if (newGoals.length > 2) {
      while (!newGoals[newGoals.length - 1] && !newGoals[newGoals.length - 2] && newGoals.length > 2) {
        newGoals.pop();
      }
    }

    if (!!lastVal) {
      newGoals.push("")
    }
    setGoals(newGoals)
  }

  const changeStageNameText = (value: string, index: number) => {
    stageNames[index] = value;
    const newStageNames = [...stageNames];
    setStageNames(newStageNames);
  }


  const addJourney = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    goals.pop();
    const steps: Step[] = goals.map((x, i) => ({
      name: stageNames[i],
      description: x
    }))
    ideaRepo?.createUserJourney(
      auth?.user?.userId || "",
      {
        pmfDescription: formData.get('pmf')?.toString() || "",
        steps: [
          { name: "Idea", description: "" },
          ...steps,
          { name: "Product Market Fit", description: "" }],
      }
    )
    
    closeFn();
  }

  return (
    <div>
      <form onSubmit={addJourney}>
        <Card>
          <CardHeader>
            <div className="w-full">
              <h1 className="font-bold mb-3">Create Journey</h1>
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
                      <Card key={`set-goal-${i + 1}`}>
                        <CardBody>
                          <div className="flex flex-col gap-5">
                            <div>
                              <Input
                                type="text"
                                label="Stage Name"
                                placeholder="Stage Name"
                                labelPlacement="outside"
                                color='default'
                                name='stage_name'
                                id='stage_name'
                                onValueChange={(val) => changeStageNameText(val, i)}
                              />
                            </div>
                            <Textarea

                              className="max-w-full"
                              name="goal"
                              labelPlacement="outside"
                              label={`Description ${i + 1}`}
                              onValueChange={(val) => changeText(val, i)}
                              value={x}
                            />
                          </div>
                        </CardBody>
                      </Card>

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

export default function Journeys() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { ideaRepo } = useIdeaContext();
  const { auth } = useAuthContext();
  const { tracker } = useTrackingContext();

  const router = useRouter();
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    ideaRepo?.getJourneys().then(x => {
      setJourneys(x);
    })
  }, [journeys.length])

  useEffect(() => {
    tracker?.trackJourneyPageViewed();
  }, [tracker])

  const openCreateJourneyModal = () => {
    if (!auth?.user) {
      router.push('/auth/login')
    }
    tracker?.trackAddNewJourney()
    onOpen();
  }

  const closeCreateJourney = () => {
    onClose();
    setJourneys([]);
  }


  return (
    <div>
      <div className="flex justify-end items-center px-6">
        <Button variant="light" isIconOnly onClick={openCreateJourneyModal}> <AddIcon className="h-6 w-6" /></Button>
        <Modal
          isOpen={isOpen}
          placement="top"
          onOpenChange={onOpenChange}
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <CreateJourney closeFn={closeCreateJourney} />
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
        {
          journeys.map((x, i) => (
            <JourneyCard journey={x} key={`journey-${i}`} />
          ))

        }

        {/* <JourneyCard journey={({ pmfDescription: "rANDDDD", steps: ["iDEA", "Product Market Fit"], id: "", userId: "" })} /> */}

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