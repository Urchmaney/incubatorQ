"use client"
import { useAuthContext } from "@/services/auth/auth.context";
import { Button, Checkbox, CheckboxGroup, Input, Textarea } from "@nextui-org/react";

export default function Release() {
  const {auth} = useAuthContext();
  return (
    <div className="p-6">
      <div className="flex justify-end">
        <Button>Start</Button>
      </div>

      <div className="flex flex-col gap-8 ">
        <div>

          <Textarea
            isDisabled
            label="Goal"
            labelPlacement="outside"
            value="Lorem ipsum is a placeholder text commonly used in publishing and graphic design to demonstrate the visual form of a document or a typeface without relying on meaningful content1234. It is essentially nonsense text that still gives an idea of what real words will look like in the final product3. The phrase lorem ipsum derives from the Latin phrase dolorem ipsum, which translates to pain itself."
            className="max-w-full"
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
    </div>
  )

}