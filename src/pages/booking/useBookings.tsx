import authAxios from "@/shared/axios/authAxios";
import { useQuery } from "@tanstack/react-query";

export const useBookingListQuery = (
    page: number,
    pageSize: number,
    search: string
  ) =>
    useQuery({
      queryKey: ["booking", page, pageSize, search],
      queryFn: async () => {
        const params = {
          pageNumber: page,
          pageSize: pageSize,
          search: search,
        };
        const res = await authAxios.get(`/booking`, {
          params,
        });
  
        return res.data;
      },
    });