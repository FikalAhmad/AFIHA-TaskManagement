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
import { SubtaskScheme } from ".";
import { z } from "zod";
import { useState } from "react";
import { useCreateSubtask } from "@/app/api/task/useCreateData";

const AddSubtask = ({ taskId }: { taskId: string }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof SubtaskScheme>>({
    resolver: zodResolver(SubtaskScheme),
    defaultValues: {
      title: "",
      taskId: "",
    },
  });

  const { mutateAsync: createSubtask, isPending: loadingCreateSubtask } =
    useCreateSubtask();

  const onSubmit = async ({ title }: z.infer<typeof SubtaskScheme>) => {
    await createSubtask({
      title,
      taskId: taskId || "",
    });
    form.reset();
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-3 justify-start">
            <Plus /> Add New Subtask
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[768px]">
          <DialogHeader>
            <DialogTitle>Add New Subtask</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Title:</Label>
                    <FormControl>
                      <Input placeholder="Title" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black"
                  disabled={loadingCreateSubtask}
                >
                  {loadingCreateSubtask ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSubtask;
