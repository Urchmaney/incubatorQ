"use client"
import { Idea } from "@/services/repo/IAppRepo";
import { useIdeaContext } from "@/services/repo/idea.context";
import { Link, Textarea } from "@nextui-org/react";

export default function Problem() {
  const { ideaRepo, activeIdea, setActiveIdea } = useIdeaContext();

  const updateDescription = (() => {
    let timeoutId: NodeJS.Timeout;
    return (description: string) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        ideaRepo?.updateIdeaProperties(activeIdea?.id || "", { description })
        setActiveIdea?.({...activeIdea, description} as Idea)
      }, 2000)
    }
  })();

  const updateProblem = (() => {
    let timeoutId: NodeJS.Timeout;
    return (problem: string) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => { 
        ideaRepo?.updateIdeaProperties(activeIdea?.id || "", { problem })
        setActiveIdea?.({...activeIdea, problem } as Idea)
      }, 2000)
    }
  })();

  return (
    <div className="p-6 pt-10">
      <div className="flex flex-col gap-9">
        <div>
          <Textarea
            label="Idea Description"
            labelPlacement="outside"
            defaultValue={activeIdea?.description || ""}
            onValueChange={updateDescription}
            className="max-w-full"
          />
        </div>

        <div>
          <Textarea
            label="What problem are you trying to solve?"
            labelPlacement="outside"
            className="max-w-full"
            defaultValue={activeIdea?.problem || ""}
            onValueChange={updateProblem}
          />
        </div>

        <div className="flex justify-end">
          <Link href="#"> Use the 5 WHY’S to get clarity on exactly what problem you are solving for.</Link>
        </div>
      </div>
    </div>
  )
}