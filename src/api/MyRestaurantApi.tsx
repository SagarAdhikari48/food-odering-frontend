import type { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching restaurant: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  const query = useQuery({
    queryKey: ["myRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  return {
    myRestaurant: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaturantRequest = async (
    restaurantData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantData,
    });
    if (!response.ok) {
      throw new Error(
        `Error creating restaurant: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createMyRestaturantRequest,
    onSuccess: () => {
      toast.success("Restaurant created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create restaurant: ${error.message}`);
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;
  return {
    createRestaurant: mutate,
    isLoading: isPending,
    isError,
    isSuccess,
    error,
  };
};
