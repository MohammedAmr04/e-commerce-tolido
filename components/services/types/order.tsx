export type IOrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";

export interface IOrderItem {
  id: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  status:   IOrderStatus;
  date: string;
  trackingNumber: string;
  totalPrice: number;
  items: IOrderItem[];
  address: string;
}   
