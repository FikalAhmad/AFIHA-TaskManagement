"use client";

import { TaskDataScheme } from "@/app/types/datatype-task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchingTasks } from "@/app/api/task/useFetchingData";
import { useDeleteTask } from "@/app/api/task/useDeleteData";

const SubtaskList = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [idSelect, setIdSelect] = useState<string>("");

  const {
    data: taskData,
    isLoading: loadingTaskData,
    isError,
    error: apiError,
  } = useFetchingTasks();

  const { mutateAsync: deleteTask } = useDeleteTask();

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
        ? taskData?.result?.data?.map((item: TaskDataScheme) => item.id)
        : []
    );
    setSelectAll(isChecked);
  };

  const handleSelect = () => {
    setIdSelect("");
  };

  const handleDelete = async () => {
    await deleteTask(checkedItems);
  };

  if (loadingTaskData) return <div>Loading...</div>;
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
        {taskData?.result?.data.length !== 0 ? (
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
              {taskData?.result?.data.map((item: TaskDataScheme) => {
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
            You haven&apos;t added any subtasks yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtaskList;
