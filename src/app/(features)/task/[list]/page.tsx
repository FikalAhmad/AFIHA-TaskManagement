"use client";
import { useFetchingListById } from "@/app/api/task/useFetchingData";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import TaskDetail from "../_components/TaskDetail";
import AddTask from "../_components/AddTask";
import { ListWithTask } from "@/app/types/datatype-list";
import { Checkbox } from "@/components/ui/checkbox";

const ListPage = ({ params }: { params: { list: string } }) => {
  const { list } = params; //the destruct variable name must match the folder name. for example the folder [list] then it must be { list }
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [idSelect, setIdSelect] = useState<string>("");

  const { data: GetListData, isLoading: LoadingListData } =
    useFetchingListById(list);

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
  console.log(GetListData?.result?.data);

  const handleSelectAllChange = (isChecked: boolean) => {
    setCheckedItems(
      isChecked
        ? GetListData?.result?.data?.task.map(
            (item: ListWithTask) => item.taskId
          )
        : []
    );
    setSelectAll(isChecked);
  };

  const handleSelect = () => {
    setIdSelect("");
  };

  // const handleDelete = async () => {
  //   await deleteTask(checkedItems);
  // };

  return (
    <div className="w-full h-screen">
      <div className="m-5 text-4xl font-semibold">
        {GetListData?.result?.data.name}
      </div>
      <div className="flex justify-between gap-5 h-full m-5">
        <div className="w-full h-full">
          <AddTask />
          {GetListData?.result?.data.task.length !== 0 ? (
            <>
              <div className="flex justify-between py-3 items-center">
                <div className="flex gap-2 items-center text-sm">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={() => handleSelectAllChange(!selectAll)}
                  />
                  Select All
                </div>
                {/* <Button
                size={"sm"}
                variant={"destructive"}
                className="text-xs"
                onClick={handleDelete}
              >
                Hapus Task
              </Button> */}
              </div>
              <ScrollArea className="h-[73vh]">
                {GetListData?.result?.data.task.map((item: ListWithTask) => {
                  return (
                    <div
                      className="py-2 pl-5 border-b-2"
                      key={`tasklist-item-${item.taskId}`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Checkbox
                          id="task"
                          checked={checkedItems.includes(item.taskId)}
                          onCheckedChange={() =>
                            handleCheckboxChange(item.taskId)
                          }
                        />
                        <Button
                          variant="ghost"
                          className="w-full flex justify-between"
                          onClick={() => setIdSelect(item.taskId)}
                        >
                          {item.task.title}
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
    </div>
  );
};

export default ListPage;
