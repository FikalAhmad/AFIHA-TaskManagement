import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetApi } from "@/app/hooks/useFetch";
import { ListScheme } from "@/app/types/datatype-list";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TaskDetailScheme } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useFetchingTaskById } from "@/app/api/task/useFetchingTasks";
import { useUpdateTask } from "@/app/api/task/useUpdateTask";
import { TaskDataScheme } from "@/app/types/datatype-task";

type ID = {
  id?: string;
  close: () => void;
};

const TaskDetail = ({ id, close }: ID) => {
  const [inputEnabled, setInputEnabled] = useState(true);
  const session = useSession();

  const form = useForm<z.infer<typeof TaskDetailScheme>>({
    resolver: zodResolver(TaskDetailScheme),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    data: taskDataById,
    isLoading: loadingTaskDataByid,
    isError: errorTaskDataById,
    isSuccess,
  } = useFetchingTaskById(id || "");

  useEffect(() => {
    if (isSuccess && taskDataById) {
      form.reset({
        title: taskDataById.result.data.title,
        description: taskDataById.result.data.description,
      });
    }
  }, [isSuccess, taskDataById, form]);

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

  const { mutateAsync: updateTask } = useUpdateTask(id || "");

  const onEditChange = (task: TaskDataScheme) => {
    setInputEnabled(false);
    form.setValue("title", task.title);
    form.setValue("description", task.description);
  };

  const onSubmit = ({
    title,
    description,
  }: z.infer<typeof TaskDetailScheme>) => {
    console.log(title, description);
    setInputEnabled(true);
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
                            className="disabled:opacity-100"
                            {...field}
                            disabled={inputEnabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="">
                    {inputEnabled ? (
                      <Button
                        className="w-full"
                        onClick={() => onEditChange(taskDataById?.result.data)}
                      >
                        Edit Task
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button className="w-full" type="submit">
                          Edit
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => setInputEnabled(true)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </Form>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="list"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <Label>List:</Label>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              className="w-36 disabled:opacity-100"
                              disabled={inputEnabled}
                            >
                              <SelectValue placeholder="Tambah List" />
                            </SelectTrigger>
                            <SelectContent>
                              {listData?.result?.data?.map(
                                (item: ListScheme) => {
                                  return (
                                    <SelectItem key={item.id} value={item.name}>
                                      {item.name}
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <div className="my-5">
                <div className="flex justify-between mb-5">
                  <div className="text-xl font-semibold">Subtask:</div>
                  <Button size={"sm"} className="text-xs">
                    Add Subtask
                  </Button>
                </div>
                {taskDataById?.result?.data?.subtask >= 0 ? (
                  <div className="text-center text-red-500">
                    You haven&apos;t added any subtasks yet
                  </div>
                ) : (
                  <div>Ada</div>
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
