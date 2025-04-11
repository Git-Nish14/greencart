"use client";

import { dummyProducts } from "@/assets/assets";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

type CartItemsType = {
  [key: string]: number;
};

interface AppContextType {
  user: any;
  setUser: (user: any) => void;
  isSeller: boolean;
  setIsSeller: (isSeller: boolean) => void;
  showUserLogin: boolean;
  setShowUserLogin: (show: boolean) => void;
  products: typeof dummyProducts;
  currency: string | undefined;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  cartItems: CartItemsType;
}

const defaultContext: AppContextType = {
  user: null,
  setUser: () => {},
  isSeller: false,
  setIsSeller: () => {},
  showUserLogin: false,
  setShowUserLogin: () => {},
  products: [],
  currency: "",
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartItems: {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [user, setUser] = useState<any>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [products, setProducts] = useState<typeof dummyProducts>([]);
  const [cartItems, setCartItems] = useState<CartItemsType>({});

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemId: string) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Product added to cart successfully!");
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] = quantity;
      setCartItems(cartData);
      toast.success("Cart updated");
    }
  };

  const removeFromCart = (itemId: string) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Product removed from cart successfully!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value: AppContextType = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    cartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
