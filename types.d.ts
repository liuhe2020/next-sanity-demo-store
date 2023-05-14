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
type ShoppingBagItem = {
  _id: string;
  name: string;
  price: number;
  image: SanityImage;
  quantity: number;
};

type ShoppingBag = {
  total: number;
  totalQty: number;
  items: ShoppingBagItem[] | [];
  addToBag: (arg: ShoppingBagItem) => void;
  reduceFromBag: (arg: ShoppingBagItem) => void;
  updateQuantity: (arg1: ShoppingBagItem, arg2: number) => void;
  clearBag: () => void;
  hydrateBag: (arg: ShoppingBag) => void;
};

type ConfirmationOrder = {
  name: string;
  deliveryAddress: {
    address: string;
    city: string;
    country: string;
    county: string;
    fullName: string;
    postcode: string;
  };
  orderItems: { product: Product; quantity: number }[];
  orderTotal: number;
  paymentDetail: { paymentDate: string; paypalEmail: string; paypalName: string; paypalTransactionId: string };
  user: { _ref: string; _type: string };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

type PayPalPayment = {
  email_address: string;
  account_id: string;
  name: {
    given_name: string;
    surname: string;
  };
  address: {
    country_code: string;
  };
};

type PayPalCapture = {
  id: string;
  status: string;
  amount: {
    currency_code: string;
    value: string;
  };
  final_capture: boolean;
  seller_protection: {
    status: string;
    dispute_categories: string[];
  };
  seller_receivable_breakdown: {
    gross_amount: {
      currency_code: string;
      value: string;
    };
    paypal_fee: {
      currency_code: string;
      value: string;
    };
    net_amount: {
      currency_code: string;
      value: string;
    };
  };
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
  create_time: string;
  update_time: string;
};

type ShippingAddress = {
  name: {
    full_name: string;
  };
  address: {
    address_line_1: string;
    address_line_2: string;
    admin_area_2: string;
    admin_area_1: string;
    postal_code: string;
    country_code: string;
  };
};

type PurchaseItem = {
  name: string;
  unit_amount: {
    currency_code: string;
    value: string;
  };
  quantity: string;
  sku: string;
};

type PurchaseUnit = {
  reference_id: string;
  amount: {
    currency_code: string;
    value: string;
    breakdown: {
      item_total: {
        currency_code: string;
        value: string;
      };
    };
  };
  payee: {
    email_address: string;
    merchant_id: string;
  };
  items: PurchaseItem[];
  shipping: ShippingAddress;
  payments: {
    captures: PayPalCapture[];
  };
};

type Payer = {
  name: {
    given_name: string;
    surname: string;
  };
  email_address: string;
  payer_id: string;
  address: {
    country_code: string;
  };
};

type PaypalOrder = {
  id: string;
  intent: string;
  status: string;
  payment_source: {
    paypal: PayPalPayment;
  };
  purchase_units: PurchaseUnit[];
  payer: Payer;
  create_time: string;
  update_time: string;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
};

type CapturePurchaseUnit = {
  reference_id: string;
  shipping: ShippingAddress;
  payments: {
    captures: PayPalCapture[];
  };
};

type CaptureOrder = {
  id: string;
  status: string;
  payment_source: {
    paypal: PayPalPayment;
  };
  purchase_units: CapturePurchaseUnit[];
  payer: Payer;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
};
