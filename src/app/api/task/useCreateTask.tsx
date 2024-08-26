import { PostApi } from "@/app/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formTaskData: {
      title: string;
      description: string;
      userId: string;
    }) => {
      return PostApi("task", formTaskData);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["task"] });
      toast.success("Task has been created!");
    },
    onError: (error) => {
      toast.error("Failed to create task: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
};
