"use client"
import { CommentIcon } from "@/components/icons/CommentIcon";
import { Button, Card, CardBody, CardFooter, CardHeader, Textarea } from "@nextui-org/react";
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

export default function Settings() {
  return (
    <div className="p-6 pt-10 flex flex-col gap-8">
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
          <div className="flex flex-col w-full items-end px-10">
            <Button>
              Comment <CommentIcon fill="#000" width={30} height={30} size={30} />
            </Button>

          </div>
        </CardFooter>
      </Card>


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
          <div className="flex flex-col w-full items-end px-10 pb-4">
            <Button>
              Comment <CommentIcon fill="#000" width={30} height={30} size={30} />
            </Button>

          </div>
        </CardFooter>
      </Card>
    </div>
  )
}