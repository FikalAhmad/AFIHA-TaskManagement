import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useState } from "react";
import { ListScheme } from ".";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PostApi } from "@/app/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ListModal = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ListScheme>>({
    resolver: zodResolver(ListScheme),
    defaultValues: {
      name: "",
      color: "#000000",
      userId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: { name: string; color: string; userId: string }) => {
      return PostApi("list", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      toast.success("List has been created!");
    },
    onError: (error) => {
      toast.error("Failed to create list: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });

  const onSubmit = async ({ name, color }: z.infer<typeof ListScheme>) => {
    await mutation.mutateAsync({
      name,
      color,
      userId: session.data?.user?.id || "",
    });
    await setOpen(false);
    await form.setValue("name", "");
    await form.setValue("color", "");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full shadow-inner bg-accent text-accent-foreground justify-normal gap-2 hover:bg-[#EBEBEB]">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Name List:</Label>
                    <FormControl>
                      <Input placeholder="Name List" {...field} type="text" />
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
                <Button type="submit">Add List</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListModal;
