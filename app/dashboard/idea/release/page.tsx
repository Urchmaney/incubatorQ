"use client"
import { AddIcon } from "@/components/icons/AddIcon";
import { AnchorIcon } from "@/components/icons/AnchorIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { DragIndicatorIcon } from "@/components/icons/DragIndicatorIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { InfoIcon } from "@/components/icons/InfoIcon";
import { LoadingIcon } from "@/components/icons/LoadingIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { Idea, IdeaStep, StepAssumption } from "@/services/repo/IAppRepo";
import { IdeaContextProvider, useIdeaContext } from "@/services/repo/idea.context";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { BreadcrumbItem, Breadcrumbs, Button, Checkbox, CheckboxGroup, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { ReactNode, useCallback, useState } from "react";

function DraggableInput(
  { id, index, onValueChange, value, onTrashClick }:
    { id: string, index: number, onValueChange: (val: string) => void, value: string, onTrashClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: `draggable-${index}`,
    data: {
      index
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <div className="flex items-center" ref={setNodeRef} >
      <div className="cursor-pointer" ref={setActivatorNodeRef} style={style} {...listeners} {...attributes}>
        <DragIndicatorIcon size={24} />
      </div>
      <div style={style} className="flex-1">
        <Input
          type="text"
          placeholder="you@example.com"
          color='default'
          name={id}
          id={id}
          onValueChange={onValueChange}
          value={value}
          {...attributes}
          endContent={<button onClick={onTrashClick} className="focus:outline-none" type="button"><TrashIcon /></button>}
        />
      </div>
    </div>
  )
}


function DroppableSection({ id, children, index }: { id: string, children: ReactNode, index: number }) {
  const { isOver, setNodeRef: dropSecRef } = useDroppable({ id: id, data: { index, sci: `plan-${index}` } });


  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={dropSecRef} style={style}>
      {children}
    </div>
  )
}


export default function Release() {
  const { auth } = useAuthContext();
  const { activeIdea, setActiveIdea, ideaRepo } = useIdeaContext();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [assumption, setAssumption] = useState("");

  const {
    isOpen: isAssumOpen,
    onOpen: onOpenAssumModal,
    onOpenChange: onOpenAssumChange,
    onClose: onCloseAssum
  } = useDisclosure();




  const [currentStep, setCurrentStep] = useState<number>(0);

  const updateIdeaSteps = (() => {
    let timeoutId: NodeJS.Timeout;
    return (idea: Idea, key: string, value: string) => {
     
      const nSteps = idea?.steps || [({ description: "", howValidate: "", measuring: "", name: "Untitled", status: "initial" } as IdeaStep)];
      nSteps[currentStep][key as "description" | "howValidate" | "measuring"] = value
      setActiveIdea?.({ ...idea, steps: [...nSteps] } as Idea)
      clearTimeout(timeoutId)
      
      timeoutId = setTimeout(() => {
        ideaRepo?.updateIdeaProperties(activeIdea?.id || "", { steps: nSteps })
        // setActiveIdea?.({ ...activeIdea, steps: nSteps } as Idea)
        // setActiveIdea?.({...activeIdea, problem } as Idea)
        // console.log("updating   ", key, value)
      }, 4000)
    }
  })();

  const updateIdeaStepsCb = useCallback(updateIdeaSteps, [currentStep])


  const updateStepsNames = (index: number, valName: string) => {
    const nStep = [...(activeIdea?.steps || [])];
    nStep[index].name = valName;
    setActiveIdea?.({ ...activeIdea, steps: nStep } as Idea)
  }

  const addNewStep = () => {
    const nStep = [...(activeIdea?.steps || [])];
    nStep.unshift({ name: "Untitled", description: "", measuring: "", howValidate: "", status: "initial", assumptions: [] });
    //nStep.push({ name: "Untitled", description: "", measuring: "", howValidate: "", status: "initial"});
    setActiveIdea?.({ ...activeIdea, steps: nStep } as Idea)

  }

  const removeStep = (stepId: number) => {
    const nStep = [...(activeIdea?.steps || [])];
    nStep.splice(stepId, 1);
    //nStep.push({ name: "Untitled", description: "", measuring: "", howValidate: "", status: "initial"});
    setActiveIdea?.({ ...activeIdea, steps: nStep } as Idea)
  }

  const onCloseModal = () => {
    ideaRepo?.updateIdeaProperties(activeIdea?.id || "", { steps: activeIdea?.steps });
    setCurrentStep(0);
    onClose();
  }

  const addStepAssumption =  async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!assumption.length || event.key !== 'Enter') return;

    const result = await ideaRepo?.addIdeaAssumption(activeIdea?.id || "", assumption);
    if (result?.error) return


    if (!(activeIdea?.steps!)[currentStep].assumptions) {
      (activeIdea?.steps!)[currentStep].assumptions = []
    }

    (activeIdea?.steps!)[currentStep].assumptions.push({ id: result?.id || "", content: assumption })
    ideaRepo?.updateIdeaProperties(activeIdea?.id || "", { steps: activeIdea?.steps })
    setActiveIdea?.({ ...activeIdea, steps: [...(activeIdea?.steps || [])] } as Idea)
    setAssumption("")
  }

  const onDragEnd = (result: DragEndEvent) => {
    // dropped outside the list
    if (!result.over) {
      return;
    }

    const sizeOfSteps = activeIdea?.steps?.length || 0;
    const oldIndex = sizeOfSteps - Number(result.active.id.toString().split("-")[1]);
    const newIndex = sizeOfSteps - Number(result.over.id.toString().split("-")[1]);


    const newSteps = reorder(
      activeIdea?.steps || [],
      oldIndex,
      newIndex
    );

    setActiveIdea?.({ ...activeIdea, steps: newSteps } as Idea);

    // (activeIdea?.steps|| [])[oldIndex].name = "Dragging"
    // setItems(newItems)

  }


  // const [items, setItems] = useState(["Luke", "Cage", "Monac", "plag", "Junss", "Planck", "Gmae", "Pandndnd"])

  //const [items, setItems] = useState(["Luke", "Mark"])

  const reorder = (list: IdeaStep[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  const changeStepStatus = async (state: "start" | "achieved" | "stop" | "restart") => {

    const nStep = [...(activeIdea?.steps || [])];
    let val : "done" | "ongoing" | "initial" = "ongoing";
    if (state === "achieved") {
      val = "done"
    } else if (state === "stop") {
      val = "initial"
    }
    nStep[currentStep].status = val;
    await ideaRepo?.updateIdeaProperties(activeIdea?.id || "", { steps: nStep })
    setActiveIdea?.({ ...activeIdea, steps: nStep } as Idea)
    
  }


  const numberOfSteps = activeIdea?.steps?.length || 0;

  return (
    <div className="p-6">
      {
        (activeIdea?.steps || []).length > 0 && (
          <div className="flex justify-between items-center py-5">
            <Breadcrumbs underline="active" onAction={(key) => { setCurrentStep(parseInt(key.toString())) }}>
              {
                activeIdea?.steps?.map((step, i) => (
                  <BreadcrumbItem key={i} isCurrent={currentStep === i}>
                    <p className="flex items-center gap-3">
                      {step.name}
                      {step.status === "initial" && <EyeFilledIcon className="" />}
                      {step.status === "done" && <CheckIcon size={15} />}
                      {step.status === "ongoing" && <LoadingIcon size={15} fill={currentStep === i ? "#000": "gray"} />}
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
            {/* <Button onClick={onOpen}><EditIcon classnames="" /></Button> */}
            <div className="cursor-pointer" onClick={onOpen}> <EditIcon classnames="" /> </div>
          </div>
        )

      }


      <div className="flex justify-end gap-2">
        { (activeIdea?.steps || [])[currentStep]?.status === "initial" &&  <Button onClick={() => changeStepStatus("start")}>Start</Button> }

        { (activeIdea?.steps || [])[currentStep]?.status === "ongoing" &&  <Button color="danger" onClick={() => changeStepStatus("stop")}>Stop</Button> }

        { (activeIdea?.steps || [])[currentStep]?.status === "ongoing" &&  <Button color="primary" onClick={() => changeStepStatus("achieved")}>Achieved</Button> }

        { (activeIdea?.steps || [])[currentStep]?.status === "done" &&  <Button color="default" onClick={() => changeStepStatus("restart")}>Restart</Button> }

       
      </div>

      <div className="flex flex-col gap-12 ">
        <div>

          <Textarea
            label="Goal"
            labelPlacement="outside"
            defaultValue={activeIdea?.steps?.[currentStep]?.description || ""}
            onValueChange={(val) => updateIdeaStepsCb(activeIdea!, "description", val)}
            value={activeIdea?.steps?.[currentStep]?.description || ""}
          />

        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-[0.875rem] text-gray-500">What are we validating?</p>
            <div className="cursor-pointer" onClick={onOpenAssumModal}> <AddIcon size={20} /> </div>
            {/* <Button onClick={onOpenAssumModal} variant="light"><AddIcon size={20} /></Button> */}
          </div>
          <div className="flex flex-col gap-2">
            {
              (activeIdea?.steps || [])[currentStep]?.assumptions?.map(assump => (
                <div key={assump.id}>
                  <Checkbox value="buenos-aires" defaultSelected color="default" >{assump.content}</Checkbox>
                </div>
              )
              )
            }

            <div className="flex">
              <Checkbox></Checkbox>

              <Input
                type="text"
                color='primary'
                name='newAssumption'
                id='newAssumption'
                autoFocus
                size="sm"
                value={assumption}
                onValueChange={setAssumption}
                onKeyDown={addStepAssumption}
              />


            </div>
          </div>

        </div>

        <div>

          <Textarea
            label="How are we validating ?"
            labelPlacement="outside"
            onValueChange={(val) => updateIdeaSteps(activeIdea!, "howValidate", val)}
            defaultValue={activeIdea?.steps?.[currentStep]?.howValidate || ""}
            className="max-w-full"
          />

        </div>

        <div>

          <Textarea
            label="How are we measuring success ?"
            labelPlacement="outside"
            onValueChange={(val) => updateIdeaSteps(activeIdea!, "measuring", val)}
            defaultValue={activeIdea?.steps?.[currentStep]?.measuring || ""}
            className="max-w-full"
          />

        </div>
      </div>


      <Modal isOpen={isAssumOpen} onOpenChange={onOpenAssumChange} onClose={onCloseAssum} placement="top">
        <ModalContent>
          {(onCloseAssum) => (
            <>
              <ModalHeader>

              </ModalHeader>
              <ModalBody>

                Issue Loading Assumptions
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpen}
        placement="top"
        onOpenChange={onOpenChange}
        onClose={onCloseModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>

              </ModalHeader>
              <ModalBody>
                {/* <p className="py-5">
                  Invitation to join the idea:  <span  className="font-bold">Mine</span>
                </p> */}
                <div className="flex gap-6 flex-col">
                  <div className="flex justify-end">
                    <Button onClick={addNewStep} variant="light"><AddIcon classname="" size={24} /></Button>
                  </div>


                  <DndContext onDragEnd={onDragEnd}>
                    <div className="gap-5 flex flex-col">
                      {

                        activeIdea?.steps?.map((step, index) => (
                          <DroppableSection id={`drop-${numberOfSteps - index}`} key={`drop-${numberOfSteps - index}`} index={numberOfSteps - index}>

                            <DraggableInput id={`drag-${numberOfSteps - index}`} index={numberOfSteps - index} onValueChange={(val) => { updateStepsNames(index, val) }} value={step.name} onTrashClick={() => removeStep(index)} />


                          </DroppableSection>
                        ))
                      }
                    </div>

                  </DndContext>
                </div>



              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )

}