import { IOrder } from "../types/order";

export const mockOrders: IOrder[] = [
  {
    id: "ORD-2024-001",
    status: "Shipped",
    date: "Jan 15, 2024",
    trackingNumber: "TRK123456789",
    totalPrice: 45.99,
    address: "123 Main Street, New York, NY 10001",
    items: [
      {
        id: "1",
        title: "Organic Tomatoes",
        image: "/products/tuna-1.jpeg",
        quantity: 2,
        price: 8.99,
      },
      {
        id: "2",
        title: "Black Beans",
        image: "/products/tuna-1.jpeg",
        quantity: 3,
        price: 3.49,
      },
      {
        id: "3",
        title: "Pasta Sauce",
        image: "/products/tuna-1.jpeg",
        quantity: 1,
        price: 4.99,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    status: "Delivered",
    date: "Feb 2, 2024",
    trackingNumber: "TRK987654321",
    totalPrice: 29.49,
    address: "45 Park Ave, Los Angeles, CA 90001",
    items: [
      {
        id: "4",
        title: "Tuna Cans",
        image: "/products/tuna-1.jpeg",
        quantity: 4,
        price: 5.49,
      },
      {
        id: "5",
        title: "Sweet Corn",
        image: "/products/tuna-1.jpeg",
        quantity: 2,
        price: 3.99,
      },
    ],
  },
  {
    id: "ORD-2024-003",
    status: "Pending",
    date: "Mar 10, 2024",
    trackingNumber: "TRK112233445",
    totalPrice: 19.99,
    address: "789 Sunset Blvd, Miami, FL 33101",
    items: [
      {
        id: "6",
        title: "Canned Mushrooms",
        image: "/products/tuna-1.jpeg",
        quantity: 3,
        price: 4.99,
      },
    ],
  },
];
