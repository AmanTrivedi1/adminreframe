import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import React from "react";

const NewUser = () => {
  return (
    <>
      <div>
        <Button variant="ghost" className="border">
          <Link
            className="flex items-center justify-between gap-x-2"
            href={"/dashboard/user"}>
            <ArrowLeftFromLine />
            Dashboard
          </Link>
        </Button>
      </div>
      <div className="flex items-center  justify-center ">
        <div className="max-w-xl w-full m-4">
          <div className="border-2 rounded-lg p-4">
            <div className="border-b">
              <h1 className="text-2xl pb-2 text-center font-semibold">
                Create new user
              </h1>
            </div>

            <div className="mt-6 flex flex-col gap-y-2">
              <div className="flex  w-full gap-x-2 justify-between">
                <div className="w-full">
                  <Label htmlFor="name">Name</Label>
                  <Input className="w-full" placeholder="name" id="name" />
                </div>

                <div className="w-full">
                  <Label htmlFor="email">Email</Label>
                  <Input placeholder="email" id="name" />
                </div>
              </div>

              <div className="flex  w-full gap-x-2 justify-between">
                <div className="w-full">
                  <Label htmlFor="contact">Contact</Label>
                  <Input placeholder="contact" id="name" />
                </div>

                <div className="w-full">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Male</SelectItem>
                      <SelectItem value="dark">Female</SelectItem>
                      <SelectItem value="system">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex  w-full gap-x-2 justify-between">
                <div className="w-full">
                  <Label htmlFor="Nationality">Nationality</Label>
                  <Input placeholder="nationality" id="name" />
                </div>
                <div className="w-full">
                  <Label htmlFor="Language">Language</Label>
                  <Input placeholder="language" id="name" />
                </div>
              </div>
              <div>
                <Label htmlFor="Address">Address</Label>
                <Input placeholder="address" id="name" />
              </div>
              <div className="flex  w-full gap-x-2 justify-between">
                <div className="w-full">
                  <Label htmlFor="Bank">Bank detals</Label>
                  <Input placeholder="bank" id="name" />
                </div>

                <div className="w-full">
                  <Label htmlFor="gender">Select Role</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Owner</SelectItem>
                      <SelectItem value="dark">Traveller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="items-top mt-2 flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send my registration details to email
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Please check you spam folder to get your details
                  </p>
                </div>
              </div>

              <div>
                <Button className="w-full mt-4">Countinue</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
