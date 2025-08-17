import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSections from "./CuisinesSections";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { LoadingButton } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import type { Restaurant } from "@/types";

const formSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  deliveryPrice: z.coerce.number().min(0, "Delivery price must be positive"),
  estimatedDeliveryTime: z
    .string()
    .min(1, "Estimated delivery time is required"),
  cuisines: z.array(z.string()).min(1, "At least one cuisine is required"),
  menuItems: z
    .array(
      z.object({
        name: z.string().min(1, "Menu item name is required"),
        price: z.coerce.number().min(0, "Menu item price must be positive"),
      })
    )
    .min(1, "At least one menu item is required"),
  image: z.instanceof(File).optional(),
});

type ResturantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => ResturantFormData;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<ResturantFormData>({
    resolver: zodResolver(formSchema),
    // mode: "onChange",
    defaultValues: {
      // restaurantName: "",
      // city: "",
      // country: "",
      // deliveryPrice: 0,
      // estimatedDeliveryTime: "",
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
      // imageFile: undefined,
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };
// debugger;
    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: ResturantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisine[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((item, index) => {
      formData.append(`menuItem[${index}].name`, item.name);
      formData.append(
        `menuItem[${index}].price`,
        (item.price * 100).toString()
      );
    });

    // formData.append("cuisines", JSON.stringify(formDataJson.cuisines));
    formData.append("menuItems", JSON.stringify(formDataJson.menuItems));

    if (formDataJson.image) {
      formData.append("image", formDataJson.image);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSections />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
