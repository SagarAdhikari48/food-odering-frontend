export type User = {
    _id: string;
    name: string;
    email: string;
    addressLine1: string;
    country: string;
    city: string;
}

export type Restaurant = {
    _id: string;
    user:string;
    restaurantName: string;
    deliveryPrice: number;
    estimatedDeliveryTime: string;
    city: string;
    cuisine: string;
    country: string;
    cuisines: string[];
    menuItems: MenuItem[];
}

 type MenuItem = {
    _id: string;
    name: string;
    price: number;
}