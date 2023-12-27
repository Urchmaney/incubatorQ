"use client"
import { Card, CardBody, Textarea } from "@nextui-org/react";
import { useState } from "react";

function StepCard({ expanded = false, indicator = true }: { expanded: boolean, indicator: boolean }) {
  const [xpanded, setXpanded] = useState(expanded)
  return (
    <div className="relative cursor-pointer" onClick={() => setXpanded(!xpanded)}>
      <Card>
        <CardBody>
          <p className={`${ xpanded ? 'h-24' : ''}`}>Start (Idea)</p>
        </CardBody>
      </Card>
      { indicator && <div className="absolute h-10 w-4 border-dotted border-l-2 border-b-2 left-12"></div> }
    </div>
  )
}

export default function Settings() {
  return (
    <div className="p-6 pt-10">
      <div className="flex flex-col gap-10">
        <div>
          <Textarea
            label="When have you reached product market fit?"
            labelPlacement="outside"

            className="max-w-full"
          />
        </div>

        <div>
          <div>
            <StepCard expanded={false} indicator />
          </div>
          <div className="relative top-4 left-16">
            <StepCard expanded indicator />
          </div>

          <div className="relative top-8 left-32">
            <StepCard expanded={false} indicator />
          </div>

          <div className="relative top-12 left-48">
            <StepCard expanded={false} indicator={false} />
          </div>
        </div>
      </div>
    </div>
  )
}