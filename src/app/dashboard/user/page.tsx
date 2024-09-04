
import React from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteSweep } from "react-icons/md";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TablePage from "@/app/userTable/page";
import { LogoutButton } from "@/components/logoutAlertBox";

const UserPage = () => {
  return (
    <div className="">
      <div className="flex sm:flex-row flex-col-reverse justify-between">
        <div className="flex justify-between w-full gap-x-1  ">
          <div className="flex w-full items-center space-x-2">
            <div className="md:w-[200px]">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">vsid</SelectItem>
                  <SelectItem value="dark">email</SelectItem>
                  <SelectItem value="system">contact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input className="md:w-1/2" placeholder="" />
            <div>
              <Button className="sm:block hidden">Clear</Button>
              <Button className="sm:hidden">
                <MdDeleteSweep className="text-xl" />
              </Button>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
      <div>
        <TablePage />
      </div>
    </div>
  );
};

export default UserPage;
