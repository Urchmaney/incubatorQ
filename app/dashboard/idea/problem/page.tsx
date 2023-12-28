import { Link, Textarea } from "@nextui-org/react";

export default function Problem() {
  return (
    <div className="p-6 pt-10">
      <div className="flex flex-col gap-9">
        <div>

          <Textarea
            label="Idea Description"
            labelPlacement="outside"

            className="max-w-full"
          />
        </div>

        <div>

          <Textarea
            label="What problem are you trying to solve?"
            labelPlacement="outside"

            className="max-w-full"
          />
        </div>

        <div className="flex justify-end">
          <Link href="#"> Use the five WHY’S to get clarity on exactly what problem you are solving for.</Link>
        </div>
      </div>
    </div>
  )
}