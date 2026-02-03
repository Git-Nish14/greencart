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
import axiosLib from "axios";

// Setup axios defaults
const axios = axiosLib.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getCartCount: () => number;
  getCartAmount: () => number;
  axios: typeof axios;
  fetchProducts: () => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemsType>>;
}

// Default context (fallback)
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
  setCartItems: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartItems: {},
  searchQuery: "",
  setSearchQuery: () => {},
  getCartCount: () => 0,
  getCartAmount: () => 0,
  axios,
  fetchProducts: async () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [user, setUser] = useState<any>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [products, setProducts] = useState<typeof dummyProducts>([]);
  const [cartItems, setCartItems] = useState<CartItemsType>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  //fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  //fetch user auth status , User Data and Cart Items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (error: any) {
      setUser(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addToCart = (itemId: string) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
      return updatedCart;
    });
    toast.success("Product added to cart successfully!");
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId] = quantity;
      }
      return updatedCart;
    });
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId] -= 1;
        if (updatedCart[itemId] <= 0) {
          delete updatedCart[itemId];
        }
      }
      return updatedCart;
    });
    toast.success("Product removed from cart successfully!");
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        total += product.price * cartItems[id];
      }
    }
    return Math.floor(total * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  //update database cart items
  useEffect(() => {
    const updateCart = async () => {
      if (!user?.id) return;

      try {
        const { data } = await axios.post("/api/cart/update", {
          userId: user.id,
          cartItems,
        });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    updateCart();
  }, [cartItems, user?.id]);

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
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
