import { PostApi } from "@/app/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSN = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formTaskData: {
      title: string;
      content: string;
      color: string;
      userId: string;
    }) => {
      return PostApi("stickynote", formTaskData);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["stickynote"] });
      toast.success("Sticky Note has been created!");
    },
    onError: (error) => {
      toast.error("Failed to create Sticky Note: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
};
