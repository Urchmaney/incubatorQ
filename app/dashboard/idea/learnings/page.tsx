import { AddIcon } from "@/components/icons/AddIcon";
import { Button, Card, CardBody } from "@nextui-org/react";

export default function Learnings() {
  return (
    <div className="p-6">
      <div>
        <div className="flex flex-col gap-10">
          <div className="flex justify-end items-center">
            <Button variant="light" isIconOnly> <AddIcon className="h-6 w-6" /></Button>
          </div>
          <div>
            <Card>
              <CardBody>
                <p>Make beautiful websites regardless of your design experience.</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}