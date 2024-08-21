import { DeleteApi } from "@/app/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskIds: string[]) => {
      return DeleteApi("task", taskIds);
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
};
