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
import { GetApi } from "@/app/hooks/useFetch";

type ID = {
  id: string;
  close: () => void;
};
type TaskDataDetail = {
  id: string;
  title: string;
  description: string;
  userId: string;
  subtask: {
    id: string;
    title: string;
    description: string;
    taskId: string;
  }[];
  list: {
    id: string;
    name: string;
    color: string;
    taskId: string;
  }[];
  tags: {
    id: string;
    name: string;
    color: string;
    taskId: string;
  }[];
};

const TaskDetail = ({ id, close }: ID) => {
  const [taskData, setTaskData] = useState<TaskDataDetail>();
  const [inputEnabled, setInputEnabled] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetApi(`task?id=${id}`);
        if (data) {
          setTaskData(data.result.data);
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchData();
  }, [id]);

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
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  value={taskData?.title}
                  disabled={inputEnabled}
                  className="disabled:opacity-100"
                />
                <Textarea
                  value={taskData?.description}
                  disabled={inputEnabled}
                  className="min-h-96 disabled:opacity-100"
                />
              </div>
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
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label>Due Date :</Label>
                </div>
                <div className="col-span-1">28 January 2023</div>
              </div>
              <div className="mt-5">
                <div className="text-xl font-semibold">Subtask:</div>
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
