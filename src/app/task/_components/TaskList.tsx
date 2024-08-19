"use client";

import { TaskDataScheme } from "@/app/types/datatype-task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import TaskDetail from "./TaskDetail";
import AddTask from "./AddTask";
import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DeleteApi, GetApi } from "@/app/hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TaskList = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [idSelect, setIdSelect] = useState<string>("");
  const session = useSession();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const getTaskData = await GetApi(
        `task?userId=${session?.data?.user?.id}`
      );
      return getTaskData;
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: string[]) => {
      return DeleteApi("task", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Task has been deleted!");
    },
    onError: (error) => {
      toast.error("Failed to delete task: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });

  const handleCheckboxChange = (taskId: string) => {
    setCheckedItems((prevState) => {
      const newCheckedItems = [...prevState];
      if (newCheckedItems.includes(taskId)) {
        return newCheckedItems.filter((i) => i !== taskId);
      } else {
        return [...newCheckedItems, taskId];
      }
    });
  };

  const handleSelectAllChange = (isChecked: boolean) => {
    setCheckedItems(
      isChecked
        ? data?.result?.data?.map((item: TaskDataScheme) => item.id)
        : []
    );
    setSelectAll(isChecked);
  };

  const handleSelect = () => {
    setIdSelect("");
  };

  const handleDelete = async () => {
    await mutation.mutateAsync(checkedItems);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <div>
        <h1>Error Occured</h1>
        <p>Please try again later</p>
        <p>Error Message</p>
        <p>{apiError.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-5 h-full m-5">
      <div className="w-full h-full">
        <AddTask />
        {data?.result?.data.length !== 0 ? (
          <>
            <div className="flex justify-between py-3 items-center">
              <div className="flex gap-2 items-center text-sm">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={() => handleSelectAllChange(!selectAll)}
                />
                Select All
              </div>
              <Button
                size={"sm"}
                variant={"destructive"}
                className="text-xs"
                onClick={handleDelete}
              >
                Hapus Task
              </Button>
            </div>
            <ScrollArea className="h-[73vh]">
              {data?.result?.data.map((item: TaskDataScheme) => {
                return (
                  <div className="py-2 pl-5 border-b-2" key={item.id}>
                    <div className="flex items-center gap-3 w-full">
                      <Checkbox
                        id="task"
                        checked={checkedItems.includes(item.id)}
                        onCheckedChange={() => handleCheckboxChange(item.id)}
                      />
                      <Button
                        variant="ghost"
                        className="w-full flex justify-between"
                        onClick={() => setIdSelect(item.id)}
                      >
                        {item.title}
                        <ArrowRight />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </>
        ) : (
          <div className="text-center text-red-500">
            You haven&apos;t added any tasks yet
          </div>
        )}
      </div>
      <TaskDetail id={idSelect} close={handleSelect} />
    </div>
  );
};

export default TaskList;
