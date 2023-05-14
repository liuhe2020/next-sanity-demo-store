type Category = {
  _rev: string;
  _type: string;
  name: string;
  _id: string;
  _updatedAt: string;
  slug: {
    current: string;
    _type: string;
  };
  _createdAt: string;
};

type SanityImage = {
  _type: string;
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

type Product = {
  _updatedAt: string;
  categoryRef: {
    _ref: string;
    _type: string;
  };
  images: SanityImage[];
  countInStock: number;
  description: string[];
  _createdAt: string;
  name: string;
  category: string;
  slug: {
    current: string;
    _type: string;
  };
  _rev: string;
  rating: number;
  _id: string;
  brand: string;
  price: number;
  _type: string;
  numReviews: number;
};

type Order = {
  name: string;
  orderItems: {
    product: Product;
    quantity: number;
  }[];
  orderTotal: number;
  _createdAt: string;
};

// zustand store
interface ShoppingBagItem {
  _id: string;
  name: string;
  price: number;
  image: SanityImage;
  quantity: number;
}

interface ShoppingBag {
  total: number;
  totalQty: number;
  items: ShoppingBagItem[] | [];
  addToBag: (arg: ShoppingBagItem) => void;
  reduceFromBag: (arg: ShoppingBagItem) => void;
  updateQuantity: (arg1: ShoppingBagItem, arg2: number) => void;
  clearBag: () => void;
  hydrateBag: (arg: ShoppingBag) => void;
}
