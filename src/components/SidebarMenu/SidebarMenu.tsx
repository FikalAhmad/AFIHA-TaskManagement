"use client";
import { Archive, ListTodo, Square, StickyNote } from "lucide-react";
import { useState } from "react";
import TabButton from "./TabButton";
import ListModal from "../ListComponent/ListModal";
import { useSession } from "next-auth/react";
import { GetApi } from "@/app/hooks/useFetch";
import { ListScheme } from "@/app/types/datatype-list";
import { ScrollArea } from "../ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

const SidebarMenu = () => {
  const [isActive, setIsActive] = useState<string>("task");
  const session = useSession();
  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      const getTaskData = await GetApi(
        `list?userId=${session?.data?.user?.id}`
      );
      return getTaskData;
    },
  });

  return (
    <div className="flex flex-col">
      <div className="font-semibold text-xs">TASKS</div>
      <TabButton
        tabname="Task"
        nametype="task"
        icon={<ListTodo />}
        isActive={isActive}
        onClick={() => setIsActive("task")}
      />
      <TabButton
        tabname="Archive"
        nametype="archive"
        icon={<Archive />}
        isActive={isActive}
        onClick={() => setIsActive("archive")}
      />
      <TabButton
        tabname="Sticky Note"
        nametype="stickynote"
        icon={<StickyNote />}
        isActive={isActive}
        onClick={() => setIsActive("stickynote")}
      />
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-xs mt-5">LISTS</div>
        <ScrollArea className="h-64 w-full">
          <div className="flex flex-col">
            {data?.result?.data.map((item: ListScheme) => {
              return (
                <TabButton
                  key={item.id}
                  tabname={item.name}
                  nametype={item.name}
                  icon={<Square color={item.color} fill={item.color} />}
                  isActive={isActive}
                  onClick={() => setIsActive(`${item.name}`)}
                />
              );
            })}
          </div>
        </ScrollArea>
        <ListModal />
      </div>
    </div>
  );
};

export default SidebarMenu;
