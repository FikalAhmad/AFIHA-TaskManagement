import { GetApi } from "@/app/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
