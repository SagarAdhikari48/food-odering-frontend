import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantApi";

const ManageRestaturantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} restaurant={myRestaurant} />
  );
};

export default ManageRestaturantPage;
