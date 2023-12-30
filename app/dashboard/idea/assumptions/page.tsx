import { ChevronDown } from "@/components/icons/ChevronIcon";
import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";

export default function Assumptions() {
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
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="london">London</Checkbox>
            <div>
              <Input
                type="text"
                color='primary'
                name='newAssumption'
                id='newAssumption'
              />
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  )
}