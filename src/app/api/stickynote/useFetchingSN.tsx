import { GetApi } from "@/app/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useFetchingSN = () => {
  const session = useSession();
  return useQuery({
    queryKey: ["stickynote"],
    queryFn: async () => {
      const getSNData = await GetApi(
        `stickynote?userId=${session?.data?.user?.id}`
      );
      return getSNData;
    },
  });
};
