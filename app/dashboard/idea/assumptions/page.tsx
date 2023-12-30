"use client"

import { ChevronDown } from "@/components/icons/ChevronIcon";
import { Assumption } from "@/services/repo/IAppRepo";
import { useIdeaContext } from "@/services/repo/idea.context";
import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { FormEvent, KeyboardEvent, KeyboardEventHandler, useEffect, useState } from "react";

export default function Assumptions() {
  const { ideaRepo, activeIdea } = useIdeaContext();
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [assumption, setAssumption] = useState("");

  useEffect(() => {
    ideaRepo?.getIdeaAssumptions(activeIdea?.id || "").then(_assumptions => {
      setAssumptions(_assumptions)
    })
  }, [assumptions.length])

  const addAssumption = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!assumption.length || event.key !== 'Enter') return;

    const { id } = await ideaRepo?.addIdeaAssumption(activeIdea?.id || "", assumption) || {};
    if (id) {
      setAssumptions([...assumptions, { id, content: assumption || "" }]);
      setAssumption('');
    }
  }
  return (
    <div className="p-6 pt-10">
      <div>
        <div className=" px-3 py-2 bg-gray-200 flex items-center justify-between">
          <div className="">
            <p>Assumptions</p>
            <p className="text-sm">
              Things you believe about your customers
            </p>
          </div>
          <div>
            <ChevronDown fill="black" size={20} width={20} />
          </div>
        </div>

        <div className="p-3 py-4">
          <CheckboxGroup>
            { assumptions.map(assump => (
              <Checkbox value={assump.id} key={`assumption-${assump.id}`}>{assump.content}</Checkbox>
            ))}
            
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
                  onKeyDown={addAssumption}
                />
             

            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  )
}