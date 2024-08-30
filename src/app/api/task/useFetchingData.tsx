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
