import { DeleteApi } from "@/app/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSN = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (snIds: string[]) => {
      return DeleteApi("stickynote", snIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickynote"] });
      toast.success("Sticky Note has been deleted!");
    },
    onError: (error) => {
      toast.error("Failed to delete Sticky Note: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
};
