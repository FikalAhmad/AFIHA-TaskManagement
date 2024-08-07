"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskScheme } from ".";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PostApi } from "@/app/hooks/useFetch";
import { useState } from "react";

interface Task {
  title: string;
  description: string;
  subtask?: string[];
  list?: string;
  tags?: string;
}

const AddTask = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof TaskScheme>>({
    resolver: zodResolver(TaskScheme),
    defaultValues: {
      title: "",
      description: "",
      userId: "",
    },
  });

  const handleSubmit = async ({
    title,
    description,
  }: z.infer<typeof TaskScheme>) => {
    try {
      await PostApi("task", {
        title,
        description,
        userId: session.data?.user?.id || "",
      });
      await setOpen(false);
      await location.reload();
    } catch (error) {
      console.error("Failed to submit task:", error);
    }
  };

  return (
    <div className="my-3 flex flex-col">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-3 justify-start">
            <Plus /> Add New Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[768px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Title:</Label>
                    <FormControl>
                      <Input placeholder="Title" {...field} type="title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description:</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Type your description here"
                        className="overflow-hidden col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
