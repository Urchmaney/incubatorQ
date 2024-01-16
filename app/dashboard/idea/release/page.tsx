"use client"
import { CheckIcon } from "@/components/icons/CheckIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { InfoIcon } from "@/components/icons/InfoIcon";
import { useAuthContext } from "@/services/auth/auth.context";
import { useIdeaContext } from "@/services/repo/idea.context";
import { BreadcrumbItem, Breadcrumbs, Button, Checkbox, CheckboxGroup, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function Release() {
  const { auth } = useAuthContext();
  const { activeIdea } = useIdeaContext();

  const [currentStep, setCurrentStep] = useState<number>(0)

  return (
    <div className="p-6">
      {
        (activeIdea?.steps || []).length > 0 && (
          <div>
            <Breadcrumbs underline="active" onAction={(key) => setCurrentStep(parseInt(key.toString()))}>
              {
                activeIdea?.steps?.map((step, i) => (
                  <BreadcrumbItem key={i} isCurrent={currentStep === i }>
                    <p className="flex items-center gap-3">
                      {step.name} 
                      { step.status === "initial" && <EyeFilledIcon className="" /> }
                      { step.status === "done" && <CheckIcon size={15} /> }
                      { step.status === "ongoing" && <InfoIcon size={15}  /> }
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
          </div>
        )

      }


      <div className="flex justify-end">
        <Button>Start</Button>
      </div>

      <div className="flex flex-col gap-8 ">
        <div>

          <Textarea
            isDisabled
            label="Goal"
            labelPlacement="outside"
            value={activeIdea?.steps?.[currentStep]?.description || ""}
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

            className="max-w-full"
          />

        </div>

        <div>

          <Textarea
            label="How are we measuring success ?"
            labelPlacement="outside"

            className="max-w-full"
          />

        </div>
      </div>
    </div >
  )

}