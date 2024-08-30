import { PatchApi } from "@/app/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTask = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formPatchTaskData: {
      title: string;
      description: string;
      list: string;
    }) => {
      return PatchApi(`task?id=${id}`, formPatchTaskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Task has been updated!");
    },
    onError: (error) => {
      toast.error("Failed to update task: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
};
