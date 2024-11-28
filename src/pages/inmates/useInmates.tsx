import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authAxios from "@/shared/axios/authAxios";
import { toast } from "@/components/ui/use-toast";

export const useInmatesListQuery = (
  page: number,
  pageSize: number,
  search: string
) =>
  useQuery({
    queryKey: ["inmates", page, pageSize, search],
    queryFn: async () => {
      const params = {
        pageNumber: page,
        pageSize: pageSize,
        search: search,
      };
      const res = await authAxios.get(`/inmateProfile`, {
        params,
      });

      return res.data;
    },
  });

export const useInmateCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createInmate"],
    mutationFn: (data: any) => authAxios.post(`/inmateprofile`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inmates"] });
      toast({
        title: "Success",
        description: "Inmate profile created successfully",
      });
    },
    onError: (error: any) => {
      let errorMessage = "Error creating inmate";
      if (error.response) {
        errorMessage =
          error.response.data?.message || "Failed to create inmate";
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

export const useInmateDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, any, any>({
    mutationKey: ["deleteInmate"],
    mutationFn: (inmateId) => authAxios.delete(`/inmateprofile/${inmateId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inmates"] });
      toast({
        title: "Success",
        description: "Inmate deleted successfully",
      });
    },
    onError: (error: any) => {
      let errorMessage = "Error deleting inmate";
      if (error.response) {
        errorMessage =
          error.response.data?.message || "Failed to delete inmate";
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

export const useInmateUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createInmate"],
    mutationFn: (data: any) => authAxios.put(`/inmateprofile/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inmates"] });
      toast({
        title: "Success",
        description: "Inmate update successfully",
      });
    },
    onError: (error: any) => {
      let errorMessage = "Error updating inmate";
      if (error.response) {
        errorMessage =
          error.response.data?.message || "Failed to update inmate";
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
