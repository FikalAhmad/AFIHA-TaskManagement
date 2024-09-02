import { GetApi } from "@/app/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

//! ========== TASK ==========
export const useFetchingTasks = () => {
  const session = useSession();
  return useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const getTaskData = await GetApi(
        `task?userId=${session?.data?.user?.id}`
      );
      return getTaskData;
    },
  });
};

export const useFetchingTaskById = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const getTaskDataById = await GetApi(`task?id=${id}`);
      return getTaskDataById;
    },
    enabled: !!id,
  });
};

//! ========== LIST ==========
export const useFetchingLists = () => {
  const session = useSession();
  return useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      const getListData = await GetApi(
        `list?userId=${session?.data?.user?.id}`
      );
      return getListData;
    },
  });
};

export const useFetchingListById = (id: string) => {
  return useQuery({
    queryKey: ["list", id],
    queryFn: async () => {
      const getListDataById = await GetApi(`list?id=${id}`);
      return getListDataById;
    },
    enabled: !!id,
  });
};

//! ========== SUBTASK ==========
export const useFetchingSubtask = (taskId: string) => {
  return useQuery({
    queryKey: ["subtask", taskId],
    queryFn: async () => {
      const getSubtaskData = await GetApi(`subtask?taskId=${taskId}`);
      return getSubtaskData;
    },
    enabled: !!taskId,
  });
};
