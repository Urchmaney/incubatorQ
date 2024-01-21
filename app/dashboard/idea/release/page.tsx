"use client"
import { AnchorIcon } from "@/components/icons/AnchorIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { DragIndicatorIcon } from "@/components/icons/DragIndicatorIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { InfoIcon } from "@/components/icons/InfoIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { Idea } from "@/services/repo/IAppRepo";
import { useIdeaContext } from "@/services/repo/idea.context";
import { BreadcrumbItem, Breadcrumbs, Button, Checkbox, CheckboxGroup, Input, Modal, ModalBody, ModalContent, ModalFooter, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";


export default function Release() {
  const { auth } = useAuthContext();
  const { activeIdea, setActiveIdea, ideaRepo } = useIdeaContext();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [currentStep, setCurrentStep] = useState<number>(0);

  const updateIdeaSteps = (() => {
    let timeoutId: NodeJS.Timeout;
    return (key: string, value: string) => {
      const nSteps = activeIdea?.steps || [{ description: "", howValidate: "", measuring: "", name: "Untitled", status: "initial" }];
      nSteps[currentStep][key as "description" | "howValidate" | "measuring"] = value

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        ideaRepo?.updateIdeaProperties(activeIdea?.id || "", { steps: nSteps })
        setActiveIdea?.({ ...activeIdea, steps: nSteps } as Idea)
        // setActiveIdea?.({...activeIdea, problem } as Idea)
        console.log("updating   ", key, value)
      }, 4000)
    }
  })();



  return (
    <div className="p-6">
      {
        (activeIdea?.steps || []).length > 0 && (
          <div className="flex justify-between items-center py-5">
            <Breadcrumbs underline="active" onAction={(key) => setCurrentStep(parseInt(key.toString()))}>
              {
                activeIdea?.steps?.map((step, i) => (
                  <BreadcrumbItem key={i} isCurrent={currentStep === i}>
                    <p className="flex items-center gap-3">
                      {step.name}
                      {step.status === "initial" && <EyeFilledIcon className="" />}
                      {step.status === "done" && <CheckIcon size={15} />}
                      {step.status === "ongoing" && <InfoIcon size={15} />}
                    </p>
                  </BreadcrumbItem>
                ))
              }

              {/* <BreadcrumbItem key="music" isCurrent={currentPage === "music"}>
                Musicrfvfvrefrefrefrefe
              </BreadcrumbItem>
              <BreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
                Artist
              </BreadcrumbItem>
              <BreadcrumbItem key="album" isCurrent={currentPage === "album"}>
                Album
              </BreadcrumbItem>
              <BreadcrumbItem key="song" isCurrent={currentPage === "song"}>
                Song
              </BreadcrumbItem> */}
            </Breadcrumbs>
            <div className="cursor-pointer" onClick={onOpen}> <AnchorIcon size={15} /> </div>
          </div>
        )

      }


      <div className="flex justify-end">
        <Button>Start</Button>
      </div>

      <div className="flex flex-col gap-8 ">
        <div>

          <Textarea
            label="Goal"
            labelPlacement="outside"
            defaultValue={activeIdea?.steps?.[currentStep]?.description || ""}
            onValueChange={(val) => updateIdeaSteps("description", val)}
          />

        </div>

        <div>
          <CheckboxGroup
            label="What are we validating?"
          >
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="london">London</Checkbox>
            <Checkbox value="tokyo">Tokyo</Checkbox>
          </CheckboxGroup>
        </div>

        <div>

          <Textarea
            label="How are we validating ?"
            labelPlacement="outside"
            onValueChange={(val) => updateIdeaSteps("howValidate", val)}
            defaultValue={activeIdea?.steps?.[currentStep]?.howValidate || ""}
            className="max-w-full"
          />

        </div>

        <div>

          <Textarea
            label="How are we measuring success ?"
            labelPlacement="outside"
            onValueChange={(val) => updateIdeaSteps("measuring", val)}
            defaultValue={activeIdea?.steps?.[currentStep]?.measuring || ""}
            className="max-w-full"
          />

        </div>
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
                {/* <p className="py-5">
                  Invitation to join the idea:  <span  className="font-bold">Mine</span>
                </p> */}


        
                <div className="gap-2 flex flex-col">

                  {/* <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div> */}



                  <div className="flex items-center">
                    <div className="cursor-pointer">
                      <DragIndicatorIcon fill="#000" size={24} />
                    </div>
                    <Input
                      type="text"
                      placeholder="you@example.com"
                      color='default'
                      name='step1'
                      id='step1'

                    />
                  </div>

                  <div className="flex items-center">
                    <div className="cursor-pointer">
                      <DragIndicatorIcon fill="#000" size={24} />
                    </div>
                    <Input
                      type="text"
                      placeholder="you@example.com"
                      color='default'
                      name='step1'
                      id='step1'

                    />
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Accept
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )

}