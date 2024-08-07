"use client";
import { getTaskData } from "@/app/data/TaskData";
import { TaskDataScheme } from "@/app/types/datatype-task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import TaskDetail from "./TaskDetail";
import AddTask from "./AddTask";
import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetApi } from "@/app/hooks/useFetch";

const TaskList = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [idSelect, setIdSelect] = useState<string>("");
  const [taskData, setTaskData] = useState<TaskDataScheme[]>([]);
  const [loading, setLoading] = useState(true);

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetApi(`task?userId=${session?.data?.user?.id}`);
        // || or ??
        setTaskData(data.result.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.data?.user?.id]);
  console.log(taskData);

  const handleSelect = () => {
    setIdSelect("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-between gap-5 h-[70vh] m-5">
      <div className="w-full h-full">
        <AddTask />
        <div className="flex gap-2 items-center text-sm">
          <Checkbox onClick={() => setIsChecked(!isChecked)} />
          Select All
        </div>
        <ScrollArea className="h-full">
          {taskData?.map((item) => {
            return (
              <div className="py-2 pl-5 border-b-2" key={item.id}>
                <div className="flex items-center gap-3 w-full">
                  <Checkbox id="task" checked={isChecked} />
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
      </div>
      <TaskDetail id={idSelect} close={handleSelect} />
    </div>
  );
};

export default TaskList;
