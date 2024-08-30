import { PostApi } from "@/app/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

//! ========== TASK ==========
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

//! ========== LIST ==========
export const useCreateList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formTaskData: {
      name: string;
      color: string;
      userId: string;
    }) => {
      return PostApi("list", formTaskData);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["list"] });
      toast.success("List has been created!");
    },
    onError: (error) => {
      toast.error("Failed to create list: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
};

//! ========== SUBTASK ==========
export const useCreateSubtask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formTaskData: { title: string; taskId: string }) => {
      return PostApi("subtask", formTaskData);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["task"] });
      toast.success("Subtask has been created!");
    },
    onError: (error) => {
      toast.error("Failed to create subtask: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
};
