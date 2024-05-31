"use client"
import { AddIcon } from "@/components/icons/AddIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { BarChart } from "@mui/x-charts";
import { Avatar, Button, Card, CardBody, Input, Link, Navbar, NavbarContent } from "@nextui-org/react";

export default function Assumptions() {

    return (
        <div className="h-screen flex flex-col">
            <div>
                <Navbar>
                    <NavbarContent as="div" className="items-center" justify="end">
                        <Input
                            classNames={{
                                base: "max-w-full sm:max-w-[10rem] h-10 md:max-w-[30rem]",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            placeholder="Type to search..."
                            size="md"
                            startContent={<SearchIcon size={18} />}
                            type="search"
                        />
                        <Button variant="flat">
                            Login
                        </Button>
                        {/* <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
                    </NavbarContent>
                </Navbar>
            </div>
            <div className="relative grow overflow-y-scroll no-scrollbar">
                <div className="w-[80%]  mx-auto flex flex-col gap-5 py-8">
                    <div>
                        <Card>
                            <CardBody>
                                <div className=" p-5">
                                    <div className="flex items-center gap-3">
                                        <Avatar showFallback src='https://images.unsplash.com/broken' />
                                        <p>Mary Jane</p>
                                    </div>
                                    <div className="mt-4">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <BarChart
                                            xAxis={[
                                                {
                                                    id: 'barCategories',
                                                    data: ['bar A', 'bar B', 'bar C'],
                                                    scaleType: 'band',
                                                },
                                            ]}
                                            series={[
                                                {
                                                    data: [2, 5, 3],
                                                },
                                            ]}

                                            height={300}
                                        />
                                    </div>

                                    <div>
                                        <p className="flex gap-3">
                                            <span className="bg-gray-200 p-1 px-2 rounded-md text-sm">#agriculture</span>
                                            <span className="bg-gray-200 p-1 px-2 rounded-md text-sm">#investment</span>
                                        </p>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Link>View Procedure</Link>
                                        <Button> Comment </Button>
                                        <Button> Send To Email</Button>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardBody>
                                <div className=" p-5">
                                    <div className="flex items-center gap-3">
                                        <Avatar showFallback src='https://images.unsplash.com/broken' />
                                        <p>Mary Jane</p>
                                    </div>
                                    <div className="mt-4">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <BarChart
                                            xAxis={[
                                                {
                                                    id: 'barCategories',
                                                    data: ['bar A', 'bar B', 'bar C'],
                                                    scaleType: 'band',
                                                },
                                            ]}
                                            series={[
                                                {
                                                    data: [2, 5, 3],
                                                },
                                            ]}

                                            height={300}
                                        />
                                    </div>

                                    <div>
                                        <p className="flex gap-3">
                                            <span className="bg-gray-200 p-1 px-2 rounded-md text-sm">#agriculture</span>
                                            <span className="bg-gray-200 p-1 px-2 rounded-md text-sm">#investment</span>
                                        </p>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Link>View Procedure</Link>
                                        <Button> Comment </Button>
                                        <Button> Send To Email</Button>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </div>
                </div>

            </div>
            <div className="sticky bottom-5 flex justify-end py-2">
                <div className="rounded-full bg-gray-200 p-3 cursor-pointer"><AddIcon size={30} /></div>
            </div>
        </div>
    )
}