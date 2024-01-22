"use client"
import { AnchorIcon } from "@/components/icons/AnchorIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { DragIndicatorIcon } from "@/components/icons/DragIndicatorIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { InfoIcon } from "@/components/icons/InfoIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { Idea } from "@/services/repo/IAppRepo";
import { IdeaContextProvider, useIdeaContext } from "@/services/repo/idea.context";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { BreadcrumbItem, Breadcrumbs, Button, Checkbox, CheckboxGroup, Input, Modal, ModalBody, ModalContent, ModalFooter, Textarea, useDisclosure } from "@nextui-org/react";
import { ReactNode, useState } from "react";

function DraggableInput({ id, index }: { id: string, index: number }) {
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
          name='step1'
          id='step1'
          defaultValue={id}
          {...attributes}
        />
      </div>

    </div>
  )
}


function DroppableSection({ id, children, index }: { id: string, children: ReactNode, index: number }) {
  const { isOver, setNodeRef: dropSecRef } = useDroppable({ id: id, data: { index, sci: `plan-${index}`} });


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

  const onDragEnd = (result: DragEndEvent) => {
    // dropped outside the list
    if (!result.over) {
      return;
    }

    const oldIndex = Number(result.active.id.toString().split("-")[1])
    const newIndex = Number(result.over.id.toString().split("-")[1])

    const newItems = reorder(
      items,
      oldIndex,
      newIndex
    );

    setItems(newItems)
  }


  const [items, setItems] = useState(["Luke", "Cage", "Monac", "plag", "Junss", "Planck", "Gmae", "Pandndnd"])

  //const [items, setItems] = useState(["Luke", "Mark"])

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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


                <DndContext onDragEnd={onDragEnd}>


                  
                    <div className="gap-5 flex flex-col">
                      {

                        items.map((item, index) => (
                          <DroppableSection id={`drop-${index}`}  key={`dragg-${item}`} index={index}>
                             <DraggableInput id={item} index={index} />
                          </DroppableSection>
                        ))
                      }
                    </div>

                </DndContext>
              
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