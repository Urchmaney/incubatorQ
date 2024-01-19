"use client"

import { useAuthContext } from "@/services/auth/auth.context";
import { Idea } from "@/services/repo/IAppRepo";
import { useIdeaContext } from "@/services/repo/idea.context";
import { Badge, Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState, useEffect, FormEvent } from "react";

export default function Teams() {
  const { ideaRepo } = useIdeaContext();
  const { auth } = useAuthContext();

  const [userIdeas, setUserIdeas] = useState<Partial<Idea>[]>([])

  useEffect(() => {
    ideaRepo?.getUserOwnedIdeas(auth?.user?.userId || "").then(data => {
      setUserIdeas(data);
    })
  }, [userIdeas.length]);


  const inviteUserToIdea = async (event: FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    ideaRepo?.createInvitation(
      formData.get("teamemail")?.toString()!,
      userIdeas[index].name!,
      userIdeas[index].id!,
      auth?.user?.userId!
    ).then(x => {
      setUserIdeas([]);
    })
  }

  const removeUserFromIdea = (ideaIndex: number, memberIndex: number) => {
    ideaRepo?.removeMemberFromIdea(
      userIdeas[ideaIndex].id || "", 
      (userIdeas[ideaIndex]?.members || [])[memberIndex]
    ).then(x => {
      setUserIdeas([]);
    })
  }

  const removePendingUserFromIdea = (ideaIndex: number, pIndex: number) => {
    ideaRepo?.removePendingMemberFromIdea(
      userIdeas[ideaIndex].id || "", 
      (userIdeas[ideaIndex]?.pendingMembers || [])[pIndex]
    ).then(x => {
      setUserIdeas([]);
    })
  }



  return (
    <div>
      <div className="pt-10 flex justify-center">
        <div className="flex justify-between items-center px-6 gap-8 flex-wrap w-[80%]">
          {userIdeas.map((idea, index) => (
            <div key={`ownedIdes-${index}`}>
              <Card>
                <CardHeader>
                  <div>
                    <h3>{idea.name}</h3>
                    <p className="text-sm text-neutral-500">
                      Add and remove team member from this idea
                    </p>
                  </div>

                </CardHeader>
                <CardBody>
                  <div className="flex flex-col gap-8">
                    <form onSubmit={(e) => inviteUserToIdea(e, index)}>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          labelPlacement="outside"
                          color='default'
                          name='teamemail'
                          id='teamemail'
                          size="sm"

                        />
                        <Button size="sm" color="primary" type="submit">Add</Button>
                      </div>
                    </form>


                    <div className="flex gap-5 flex-col">
                      {
                        idea.members?.map((member, i) => (
                          <div className="flex justify-between" key={`ownedIdes-${index}-member${i}`}>
                            <div>
                              <p> {member.name}</p>
                              <p className="text-sm text-neutral-500">
                                {member.email}
                              </p>
                            </div>

                            <Button size="sm" onClick={() => removeUserFromIdea(index, i)}>Remove</Button>
                          </div>
                        ))
                      }

                      {
                        idea.pendingMembers?.map((member, ipending) => (
                          <div className="flex justify-between" key={`ownedIdes-${index}-pendmember${ipending}`}>
                            <div>
                              <p>  </p>
                              <p className="text-sm text-neutral-500">
                                {member.email.slice(0, 15)} {member.email.length > 15 ? '...' : ''} &nbsp;<span className="rounded-md bg-default-100 px-2 py-1">pending</span>
                              </p>
                            </div>

                            <Button size="sm" onClick={() => removePendingUserFromIdea(index, ipending)}>Remove</Button>
                          </div>
                        ))
                      }




                      {/* <div className="flex justify-between">
                        <div>
                          <p> Unegbu Kingsley</p>
                          <p className="text-sm text-neutral-500">
                            kingsobino@gmail.com
                          </p>
                        </div>

                        <Button size="sm">Remove</Button>
                      </div>


                      <div className="flex justify-between">
                        <div>
                          <p> Unegbu Kingsley</p>
                          <p className="text-sm text-neutral-500">
                            kingsobino@gmail.com
                          </p>
                        </div>

                        <Button size="sm">Remove</Button>
                      </div> */}
                    </div>
                  </div>


                </CardBody>
              </Card>
            </div>
          ))}



        </div>
      </div>

    </div>
  )
}