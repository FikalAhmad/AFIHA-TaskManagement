import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetApi, PatchApi } from "@/app/hooks/useFetch";
import { TaskDataDetail } from "@/app/types/datatype-task";
import { ListScheme } from "@/app/types/datatype-list";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TaskScheme } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ID = {
  id?: string;
  close: () => void;
};

const TaskDetail = ({ id, close }: ID) => {
  const [inputEnabled, setInputEnabled] = useState(true);
  const queryClient = useQueryClient();
  const session = useSession();

  const {
    data: taskByIdData,
    isLoading: taskByIdLoad,
    isError: taskByIdError,
  } = useQuery({
    queryKey: ["taskById", id],
    queryFn: async () => {
      const getTaskByIdData = await GetApi(`task?id=${id}`);
      return getTaskByIdData;
    },
    enabled: !!id,
  });

  const {
    data: listData,
    isLoading: listLoad,
    isError: listError,
  } = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      const getList = await GetApi(`list?userId=${session?.data?.user?.id}`);
      return getList;
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: {
      title: string;
      description: string;
      userId: string;
    }) => {
      return PatchApi("task", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Task has been created!");
    },
    onError: (error) => {
      toast.error("Failed to create task: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
  const form = useForm<z.infer<typeof TaskScheme>>({
    resolver: zodResolver(TaskScheme),
    defaultValues: {
      title: taskByIdData?.result?.data?.title,
      description: taskByIdData?.result?.data?.description,
      userId: session?.data?.user?.id,
    },
  });
  const onSubmit = async ({
    title,
    description,
  }: z.infer<typeof TaskScheme>) => {
    await mutation.mutateAsync({
      title,
      description,
      userId: session.data?.user?.id || "",
    });
  };

  return (
    <>
      {id !== "" ? (
        <Card className="w-full h-[85vh] overflow-y-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-2xl">
              Task
              <Button variant="ghost" className="px-2" onClick={close}>
                <X />
              </Button>
            </CardTitle>
          </CardHeader>
          <ScrollArea className="w-full max-h-full h-[500px]">
            <CardContent className="text-sm">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Title:</Label>
                        <FormControl>
                          <Input
                            placeholder="Title"
                            {...field}
                            type="text"
                            disabled={inputEnabled}
                            className="disabled:opacity-100"
                            value={taskByIdData?.result?.data?.title}
                          />
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
                            className="min-h-96 disabled:opacity-100"
                            {...field}
                            disabled={inputEnabled}
                            value={taskByIdData?.result?.data?.description}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              {/* <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  value={taskByIdData?.result?.data?.title ?? ""}
                  disabled={inputEnabled}
                  className="disabled:opacity-100"
                />
                <Textarea
                  value={taskByIdData?.result?.data?.description ?? ""}
                  disabled={inputEnabled}
                  className="min-h-96 disabled:opacity-100"
                />
              </div> */}
              <div className="my-3 grid grid-cols-2 gap-3 items-center">
                <div className="col-span-1">
                  <Label>List :</Label>
                </div>
                <div className="col-span-1">
                  <Select>
                    <SelectTrigger
                      className="w-[180px] disabled:opacity-100"
                      disabled={inputEnabled}
                    >
                      <SelectValue placeholder="Tambah List" />
                    </SelectTrigger>
                    <SelectContent>
                      {listData?.result?.data?.map((item: ListScheme) => {
                        return (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label>Due Date :</Label>
                </div>
                <div className="col-span-1">28 January 2023</div>
              </div>
              <div className="my-5">
                <div className="flex justify-between mb-5">
                  <div className="text-xl font-semibold">Subtask:</div>
                  <Button size={"sm"} className="text-xs">
                    Add Subtask
                  </Button>
                </div>
                {taskByIdData?.result?.data?.subtask >= 0 ? (
                  <div className="text-center text-red-500">
                    You haven&apos;t added any subtasks yet
                  </div>
                ) : (
                  <div>Ada</div>
                )}
              </div>

              <div className="">
                {inputEnabled ? (
                  <Button
                    className="w-full"
                    onClick={() => setInputEnabled(false)}
                  >
                    Edit Task
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button className="w-full">Edit</Button>
                    <Button
                      className="w-full"
                      onClick={() => setInputEnabled(true)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      ) : null}
    </>
  );
};

export default TaskDetail;
