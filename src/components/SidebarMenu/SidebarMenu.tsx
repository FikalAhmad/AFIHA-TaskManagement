"use client";
import {
  Archive,
  ListTodo,
  Notebook,
  Plus,
  Square,
  StickyNote,
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Tags from "./Tags";
import TabButton from "./TabButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SidebarMenu = () => {
  const [isActive, setIsActive] = useState<string>("task");
  return (
    <div className="flex flex-col">
      <div className="font-semibold text-xs">TASKS</div>
      <TabButton
        tabname="Task"
        nametype="task"
        icon={<ListTodo />}
        isActive={isActive}
        onClick={() => setIsActive("task")}
      />
      <TabButton
        tabname="Archive"
        nametype="archive"
        icon={<Archive />}
        isActive={isActive}
        onClick={() => setIsActive("archive")}
      />
      <TabButton
        tabname="Sticky Note"
        nametype="stickynote"
        icon={<StickyNote />}
        isActive={isActive}
        onClick={() => setIsActive("stickynote")}
      />
      <div className="font-semibold text-xs mt-5">LISTS</div>
      <TabButton
        tabname="Personal"
        nametype="personal"
        icon={<Square color="red" fill="red" />}
        isActive={isActive}
        onClick={() => setIsActive("personal")}
      />
      <TabButton
        tabname="Public"
        nametype="public"
        icon={<Square color="blue" fill="blue" />}
        isActive={isActive}
        onClick={() => setIsActive("public")}
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-accent text-accent-foreground justify-normal gap-2 hover:bg-[#EBEBEB]">
            <Plus />
            Add New List
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New List</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name List
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Color
              </Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add List</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SidebarMenu;
