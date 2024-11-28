import { toast } from "@/hooks/use-toast";
import authAxios from "@/shared/axios/authAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBookingListQuery = (
  page: number,
  pageSize: number,
  search: string
) =>
  useQuery({
    queryKey: ["bookings", page, pageSize, search],
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

export const useChargeListQuery = () =>
  useQuery({
    queryKey: ["charges"],
    queryFn: async () => {
      const res = await authAxios.get(`/charge`, {});

      return res.data;
    },
  });

export const useBookingCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createBooking"],
    mutationFn: (data: any) => authAxios.post(`/booking`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
    },
    onError: (error: any) => {
      let errorMessage = "Error creating booking";
      if (error.response) {
        errorMessage =
          error.response.data?.message || "Failed to create booking";
      } else if (error.request) {
        errorMessage = "No response from server";
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    },
  });
};

export const useBookingReleaseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["releaseBooking"],
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      authAxios.put(`/booking/${id}/release`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Success",
        description: "Booking released successfully",
      });
    },
    onError: (error: any) => {
      let errorMessage = "Error on release booking";
      if (error.response) {
        errorMessage = error.response.data?.message || "Failed to release booking";
      } else if (error.request) {
        errorMessage = "No response from server";
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    },
  });
};

export const useBookingDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, any, any>({
    mutationKey: ["deleteBooking"],
    mutationFn: (bookingId) => authAxios.delete(`/booking/${bookingId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });
    },
    onError: (error: any) => {
      let errorMessage = "Error deleting booking";
      if (error.response) {
        errorMessage =
          error.response.data?.message || "Failed to delete booking";
      } else if (error.request) {
        errorMessage = "No response from server";
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    },
  });
};
