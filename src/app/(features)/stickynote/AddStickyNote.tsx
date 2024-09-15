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
import { StickyNoteScheme } from ".";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCreateSN } from "@/app/api/stickynote/useCreateSN";

const AddStickyNote = () => {
  const session = useSession();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof StickyNoteScheme>>({
    resolver: zodResolver(StickyNoteScheme),
    defaultValues: {
      title: "",
      content: "",
      color: "",
      userId: "",
    },
  });

  const { mutateAsync: createSN, isPending: loadingCreateSN } = useCreateSN();

  const onSubmit = async ({
    title,
    content,
    color,
  }: z.infer<typeof StickyNoteScheme>) => {
    await createSN({
      title,
      content,
      color,
      userId: session.data?.user?.id || "",
    });
    form.reset();
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="absolute right-5 top-5">
            <Plus /> Add Sticky Note
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[768px]">
          <DialogHeader>
            <DialogTitle>Add New Sticky Note</DialogTitle>
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
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <Label>Content:</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Type your content here"
                        className="overflow-hidden col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <Label>Pick your color:</Label>
                    <FormControl>
                      <Input
                        placeholder="Color"
                        {...field}
                        type="color"
                        className="h-16 cursor-pointer"
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
                  disabled={loadingCreateSN}
                >
                  {loadingCreateSN ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddStickyNote;
