import { PatchApi } from "@/app/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSN = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formPatchTaskData: {
      title: string;
      content: string;
      color: string;
    }) => {
      return PatchApi(`stickynote?id=${id}`, formPatchTaskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickynote"] });
      toast.success("Sticky Note has been updated!");
    },
    onError: (error) => {
      toast.error("Failed to update Sticky Note: " + error.message);
    },
    networkMode: "online",
    retry: 1,
  });
};
